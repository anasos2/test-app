import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const PieChartWithCustomizedLabel = () => {
  const { t } = useTranslation();

  const data = [
    { label: t('live.milk'), value: 10, color: '#0088FE' },
    { label: t('live.coffee'), value: 33, color: '#00C49F' },
    { label: t('live.milkCoffee'), value: 12, color: '#FFBB28' },
    { label: t('live.tai'), value: 100, color: '#FF8042' },
    { label: t('live.juice'), value: 100, color: '#FFBB80' },
  ];

  const sizing = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    legend: { hidden: true },
  };
  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <PieChart
      series={[
        {
          outerRadius: 80,
          data,
          arcLabel: getArcLabel,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontSize: 14,
        },
      }}
      {...sizing}
    />
  );
};

export default PieChartWithCustomizedLabel;
