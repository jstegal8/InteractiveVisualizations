function getData(id) {
    // Use d3.json() to fetch data from JSON file
    d3.json("samples.json").then(sampledata => {
        console.log(sampledata)
        // Grab values from the response json object to build the plots
        var ids = sampledata.samples[0].otu_ids;
        console.log(ids)
        // Slice the first 10 objects for plotting and reverse the array due to Plotly's defaults
        var sampleValues = sampledata.samples[0].sample_values.slice(0,10).reverse();
        console.log(sampleValues)
        // Slice the first 10 objects for plotting
        var labels = sampledata.samples[0].otu_labels.slice(0,10);
        console.log(labels)

        // Slice the first 10 objects for plotting and reverse the array due to Plotly's defaults
        var OTU_top = (sampledata.samples[0].otu_ids.slice(0,10)).reverse();

        // Using the map method with the arrow function to return all the filtered cities.
        var OTU_id = OTU_top.map(d =>"OTU " + d);
        console.log(`OTU_labels: ${labels}`)

        // Creating trace.
        var trace = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
                color: 'green'},
                type:"bar",
                orientation: "h",
            };
        // Creating the data array for the plot
            var data = [trace];

        // Defining the plot layout
            var layout = {
                title: "Top 10 OTU's",
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 40
                }
            };

        // Plot the chart to a div tag with id "bar"
            Plotly.newPlot("bar", data, layout);

        //  Create the Traces
            var trace1 = {
                x: sampledata.samples[0].otu_ids,
                y: sampledata.samples[0].sample_values,
                mode: "markers",
                marker: {
                    size: sampledata.samples[0].sample_values,
                    color: sampledata.samples[0].otu_ids,
                },
                text: sampledata.samples[0].otu_labels
            };

        // Defining the plot layout
            var layout_2 = {
                xaxis:{title: "OTU ID"},
                height: 650,
                width: 1000
            };

        // Creating the data array for the plot
            var data1 = [trace1];

        // Plot the chart to a div tag with id "bubble"
            Plotly.newPlot("bubble", data1, layout_2);

        });
    }

    function getDemographicsInfo(id) {

        d3.json("samples.json").then((data)=> {

            // Data
            var metadata = data.metadata;

            // Console log data
            console.log(metadata)

            // Using filter() to pass the function as its argument
            var result = metadata.filter(meta => meta.id.toString() === id)[0];

            // Using D3 to select sample-metadata id
            var demographicInfo = d3.select("#sample-metadata");

            // Creating a placeholder
            demographicInfo.html("");

            Object.entries(result).forEach((key) => {
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
            });
        });
    }

    function optionChanged(id) {
        getData(id);
        getDemographicsInfo(id);
    }

    function init() {
      
        var dropdown = d3.select("#selDataset")

        d3.json("samples.json").then((data)=> {
            console.log(data)

            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });

            getData(data.names[0]);
            getDemographicsInfo(data.names[0]);
        });
    }

    init();