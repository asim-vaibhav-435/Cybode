import { Data } from "plotly.js";
import Plot from "react-plotly.js";
import { useQuery } from "react-query";
import { Doughnut, PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, Colors, RadialLinearScale } from "chart.js";
import { useEffect } from "react";

ChartJS.register(RadialLinearScale, Tooltip, Legend, Colors, );


const TwitterSentiment: React.FC<{ url: string }> = ({ url }) => {
  const { data, isLoading, isError , refetch} = useQuery(
    "tweet sentiment",
    async () => {
      const res = await fetch(`http://localhost:5000/sentiment?query=${url}`).then(
        (res) => res.json()
      );
      console.log(res.values);
      console.log(res.labels);
      return res;
    }
  );
  useEffect(() => {refetch()},[url])

  return (
    <div className="bg-violet-400 p-6 rounded-2xl">
      <h2 className="text-2xl font-medium mb-4">Tweet Sentiment Analysis</h2>
      {!isLoading && !isError && data && (
        <PolarArea
            data={{
                labels: data?.labels,
                datasets: [{
                    label: "Tweet Sentiment",
                    data: data?.values,
                    hoverOffset: 4
    
                }],
                
            }}
        />
      )}
    </div>
  );
};

export default TwitterSentiment;
