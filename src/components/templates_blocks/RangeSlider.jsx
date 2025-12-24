import { Range, getTrackBackground } from 'react-range';

const RangeSlider = ({ rtl, min = 0, max = 10000, step = 1, values, setValues }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'

      }}
    >
      <Range
        draggableTrack
        values={values}
        step={step}
        min={min}
        max={max}
        rtl={rtl}
        onChange={(values) => {
          setValues(values);
        }}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: '36px',
              display: 'flex',
              width: '100%'
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: '5px',
                width: '100%',
                borderRadius: '4px',
                background: getTrackBackground({
                  values,
                  colors: ['#ccc', '#FF5757', '#ccc'],
                  min,
                  max,
                  rtl
                }),
                alignSelf: 'center'
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '18px',
              width: '18px',
              borderRadius: '50%',
              backgroundColor: '#FF5757',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0px 2px 6px #AAA'
            }}
          >
            {/* <div
              style={{
                height: '5px',
                width: '5px',
                backgroundColor: isDragged ? '#548BF4' : '#CCC'
              }}
            /> */}
          </div>
        )}
      />
      <output style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} id='output'>
        <input
          type='number'
          value={values[0]}
          onChange={(e) => setValues([Number(e.target.value), values[1]])}
          style={{ padding: '5px', border: '1px solid black', width: '100px' }}
        />
        <span style={{ marginLeft: '5px', marginRight: '5px' }}>--</span>
        <input
          type='number'
          value={values[1]}
          onChange={(e) => setValues([values[0], Number(e.target.value)])}
          style={{ padding: '5px', border: '1px solid black', width: '100px' }}
        />
      </output>
    </div>
  );
};

export default RangeSlider;
