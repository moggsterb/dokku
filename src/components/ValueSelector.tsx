interface Props {
  taken: number[];
  setCellValue: (value: number | string) => void;
}

const ValueSelector = ({ taken, setCellValue }: Props) => {
  const handleClick = (value: number | string) => {
    console.log('Setting');
    setCellValue(value);
  };

  const renderItem = (value: number | string) => {
    const isTaken = typeof value === 'number' && taken.includes(value);
    const valueStyle = `value-selector__value ${
      isTaken ? 'taken' : typeof value === 'number' ? 'available' : ''
    }`;
    return (
      <div
        key={value}
        className={valueStyle}
        onClick={() => {
          if (!isTaken) handleClick(value);
        }}
      >
        {value}
      </div>
    );
  };

  return (
    <div className='value-selector'>
      <div className='value-selector__row'>
        {[1, 2, 3, 4, 5].map((value) => {
          return renderItem(value);
        })}
      </div>
      <div className='value-selector__row'>
        {[6, 7, 8, 9, 'CLEAR'].map((value) => {
          return renderItem(value);
        })}
      </div>
    </div>
  );
};

export default ValueSelector;
