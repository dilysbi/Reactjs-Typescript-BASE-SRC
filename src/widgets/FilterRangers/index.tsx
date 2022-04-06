/* eslint-disable */
import React, { useState } from 'react'
import { Range, getTrackBackground } from 'react-range'

const STEP = 0.1
const MIN = 0.01
const MAX = 10

const TypeFilterRange = ({ data }) => {
  const [state, setState] = useState({
    values: [5],
  })

  return (
    <div className="menu-filter">
      <p className="title-type-filter">PRICE RANGE</p>
      <div>
        <Range
          values={state.values}
          step={STEP}
          min={MIN}
          max={MAX}
          onChange={(values) => setState({ values })}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: '36px',
                display: 'flex',
                width: '100%',
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: '16px',
                  width: '100%',
                  background:
                    'url(assets/images/icons/range-slider.png) center center / 100% 100% no-repeat, ' +
                    getTrackBackground({
                      values: state.values,
                      colors: ['#14D1A4', '#353945'],
                      min: MIN,
                      max: MAX,
                    }),
                  alignSelf: 'center',
                }}
              >
                {children}
              </div>

              <div className="box-min-max">
                <p>{MIN} BNB</p>
                <p>{MAX} BNB</p>
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '24px',
                width: '24px',
                borderRadius: '50%',
                backgroundColor: '#fff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0px 2px 6px #AAA',
                outline: 'none',
                position: 'relative',
              }}
            >
              <span
                style={{
                  marginBottom: '60px',
                  color: '#fff',
                  outline: 'none',
                  position: 'absolute',
                  width: '100px',
                  textAlign: 'center',
                }}
                id="output"
              >
                {state.values[0].toFixed(2)} BNB
              </span>
              <div
                style={{
                  position: 'absolute',
                  height: '20px',
                  width: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#14D1A4',
                }}
              />
            </div>
          )}
        />
      </div>
    </div>
  )
}

export default TypeFilterRange
