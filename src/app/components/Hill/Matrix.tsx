import React from 'react';
import { zeros } from 'mathjs';

import './index.css';

export const Matrix = ({ handleChange, matrixData }: any) => {
    const grid: any = zeros(3, 3).valueOf();

    return (
        <div className='matrix'>
            {grid.map(
                (row: any, rowI: number) =>
                    <div key={rowI + 'row'} className='matrix-row'>
                        {row.map((col: any, colI: number) =>
                            <div key={colI + 'col'} className="matrix-col">
                                <input type="text" value={matrixData[rowI][colI] || 0} className="encode-shift"
                                    name={`${rowI}-${colI}`}
                                    onChange={handleChange}
                                />
                            </div>
                        )}
                    </div>
            )}
        </div>
    )
}