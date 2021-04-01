//Reach DOM elements.
const getButton = document.querySelector('.get');
const postButton = document.querySelector('.post');
const putButton = document.querySelector('.put');
const deleteButton = document.querySelector('.delete');

//Function to send request with buttons.
const sendRequest = async (type) => {
    await fetch(`http://localhost:3000/${type}`, {
        method: type.toUpperCase()
    })
}

//Lists for graph, later filled with data.
const getSeries = []
const postSeries = []
const putSeries = []
const deleteSeries = []

//Function to fetch data.
const fetchData = async () => {
    const response = await fetch('http://localhost:3000/logs');
    const {logs} = await response.json();

    const getRequests = []
    const postRequests = []
    const putRequests = []
    const deleteRequests = []

    //Filtering data.
    logs.forEach(element => {
        if (element.method === 'GET'){
            getRequests.push(element)
        }
        else if (element.method === 'POST'){
            postRequests.push(element)
        }
        else if (element.method === 'PUT'){
            putRequests.push(element)
        }
        else if (element.method === 'DELETE'){
            deleteRequests.push(element)
        }
    });

   //Sending to arrays for graph.
    getRequests.forEach(element => {
        getSeries.push({
            x: new Date(element.timestamp).getTime(),
            y: element.responseTime.toFixed(3)
        })
    })

    postRequests.forEach(element => {
        postSeries.push({
            x: new Date(element.timestamp).getTime(),
            y: element.responseTime.toFixed(3)
        })
    })

    putRequests.forEach(element => {
        putSeries.push({
            x: new Date(element.timestamp).getTime(),
            y: element.responseTime.toFixed(3)
        })
    })

    deleteRequests.forEach(element => {
        deleteSeries.push({
            x: new Date(element.timestamp).getTime(),
            y: element.responseTime.toFixed(3)
        })
    })
}

//Function to update chart in real time.
const updateData = async () => {
    const response = await fetch('http://localhost:3000/logs');
    const {logs} = await response.json();
//Filter data by methods.
    if (logs.length && logs [logs.length - 1].method === 'GET'){
        if (getSeries.length === 0) { //If it is first data push directly.
            getSeries.push({
                x: new Date(logs[logs.length - 1].timestamp).getTime(),
                y: logs[logs.length - 1].responseTime.toFixed(3)
            });
        }   //Otherwise check if it is different from the last element. If so push.
        else if (getSeries.length && logs [logs.length - 1].timestamp !== getSeries[getSeries.length - 1].x){
            getSeries.push({
                x: new Date(logs[logs.length - 1].timestamp).getTime(),
                y: logs[logs.length - 1].responseTime.toFixed(3)
            });
        }
    }
    if (logs.length && logs [logs.length - 1].method === 'POST'){
        if (postSeries.length === 0){
            postSeries.push({
                x: new Date(logs[logs.length - 1].timestamp).getTime(),
                y: logs[logs.length - 1].responseTime.toFixed(3)
            });
        }
        else if (postSeries.length && logs [logs.length - 1].timestamp !== postSeries[postSeries.length - 1].x){
        
            postSeries.push({
                x: new Date(logs[logs.length - 1].timestamp).getTime(),
                y: logs[logs.length - 1].responseTime.toFixed(3)
            });
        }
    }
    if (logs.length && logs [logs.length - 1].method === 'PUT'){
        if (putSeries.length === 0){
            putSeries.push({
                x: new Date(logs[logs.length - 1].timestamp).getTime(),
                y: logs[logs.length - 1].responseTime.toFixed(3)
            });
        }
        else if (putSeries.length && logs [logs.length - 1].timestamp !== putSeries[putSeries.length - 1].x){
  
            putSeries.push({
                x: new Date(logs[logs.length - 1].timestamp).getTime(),
                y: logs[logs.length - 1].responseTime.toFixed(3)
            });
        }
    }
    if (logs.length && logs [logs.length - 1].method === 'DELETE'){
        if (deleteSeries.length === 0) {
            deleteSeries.push({
                x: new Date(logs[logs.length - 1].timestamp).getTime(),
                y: logs[logs.length - 1].responseTime.toFixed(3)
            });
        }
        else if (deleteSeries.length && logs [logs.length - 1].timestamp !== deleteSeries[deleteSeries.length - 1].x){
            deleteSeries.push({
                x: new Date(logs[logs.length - 1].timestamp).getTime(),
                y: logs[logs.length - 1].responseTime.toFixed(3)
            });
        }
    }
}

//Method to render chart.
const renderChart = async () => {
    await fetchData(); //Waits data first.

    const options = {
        chart: {
          type: 'line'
        },
        //Data for chart
        series: [{
          name: 'GET',
          data: getSeries
        }, {
            name: 'POST',
            data: postSeries
        }, {
            name: 'PUT',
            data: putSeries
        },{
            name: 'DELETE',
            data: deleteSeries
        }],
        xaxis: {
          type: "datetime",
          labels: {
              format: 'HH:mm',
              datetimeUTC: false
          },
          min: new Date(Date.now() - 60 * 60 * 1000).getTime() //Formatting last 1 hour.
        },
        chart: {
            type: 'area',
        },
        stroke: {
            curve: 'smooth'
        }
      }
    
    
      const chart = new ApexCharts(document.querySelector("#chart"), options); //Accessing to DOM div with id chart and rendering.
      
      chart.render();

      //To check for updates.
      window.setInterval( async () => {
        await updateData();
            chart.updateSeries([{
                name: "GET",
                data: getSeries
            },{
                name: "POST",
                data: postSeries
            },{
                name: "PUT",
                data: putSeries
            },{
                name: "DELETE",
                data: deleteSeries
            }])
        
    }, 1000)

    //Buttons to send requests and update the graph.
    getButton.addEventListener('click', async ()=>{
        sendRequest('get');
        await updateData();
        chart.updateSeries([{
            name: "GET",
            data: getSeries
        },{
            name: "POST",
            data: postSeries
        },{
            name: "PUT",
            data: putSeries
        },{
            name: "DELETE",
            data: deleteSeries
        }])
    })
    postButton.addEventListener('click', async ()=>{
        sendRequest('post');
        await updateData();
        chart.updateSeries([{
            name: "GET",
            data: getSeries
        },{
            name: "POST",
            data: postSeries
        },{
            name: "PUT",
            data: putSeries
        },{
            name: "DELETE",
            data: deleteSeries
        }])
    })
    putButton.addEventListener('click', async ()=>{
        sendRequest('put');
        await updateData();
        chart.updateSeries([{
            name: "GET",
            data: getSeries
        },{
            name: "POST",
            data: postSeries
        },{
            name: "PUT",
            data: putSeries
        },{
            name: "DELETE",
            data: deleteSeries
        }])
    })
    deleteButton.addEventListener('click',async ()=>{
        sendRequest('delete');
        await updateData();
        chart.updateSeries([{
            name: "GET",
            data: getSeries
        },{
            name: "POST",
            data: postSeries
        },{
            name: "PUT",
            data: putSeries
        },{
            name: "DELETE",
            data: deleteSeries
        }])
    })

}

renderChart();
