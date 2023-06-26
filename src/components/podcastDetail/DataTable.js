import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import  {useParams, Link} from 'react-router-dom'

  var secondsToTime = function (s) {
    function addZ(n) {return (n<10? '0':'') + n;}

    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return addZ(hrs) + ':' + addZ(mins) + ':' + addZ(secs);
  }
  
  const formatData = data => {
    let rows = []
    data.episodesList.results && data.episodesList.results.forEach((episode,index) => {
        if(index !== 0){
            rows.push(
                {id: episode.trackId,
                title: episode.trackName,
                date:new Date( episode.releaseDate).toLocaleDateString("en-GB"),
                duration:secondsToTime(episode.trackTimeMillis)}
            )
        }
    }
        
        )
return rows
}

export default function DataTable(episodesList) {
    const {id} = useParams()
    const columns = [
        { field: 'title', headerName: 'Title', width: 800, renderCell: (params) => (
          <Link to={`/podcast/${id}/episode/${params.id}`} style={{textDecoration:"none",textDecorationColor:"none",color:"navy"}}>{params.value}</Link>
        )},
        { field: 'date', headerName: 'Date', width: 130 ,sortable: false,},
        { field: 'duration', headerName: 'Duration', width: 130, headerAlign:'right',align:'right'},
        ];
    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={formatData(episodesList)}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[10]}
          disableColumnFilter
        />
      </div>
    );
  }