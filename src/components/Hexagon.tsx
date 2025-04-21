import { HexagonData } from "../types"

type Props = {
    data: HexagonData
}

export const Hexagon = ({ data }: Props) => {
    console.log(data)
    return (
        <div className="hexagon">
            <svg viewBox="-120 -120 240 240" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <g>
                    <defs>
                        <g id="segmentedTriangle">
                            <path d="M0,0 L33,0 L16.5,28.6 Z" fill="#f9f9f9" />
                            <path d="M33,0 L66,0 L33,57.2 L16.5,28.6 Z" fill="#eeeeee" />
                            <path d="M66,0 L100,0 L50,86.6 L33,57.2 Z" fill="#e2e2e2" />
                            <path stroke="#fff" stroke-width="1" d="M0,0 L100,0 L50,86.6 Z" fill="none" />
                        </g>
                        <linearGradient id="triangleGradient0" x1="0" y1="0" x2="50" y2="86.6" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stop-color="#ff9266" />
                            <stop offset="100%" stop-color="#ff6a30" />
                        </linearGradient>
                        <linearGradient id="triangleGradient1" x1="0" y1="0" x2="50" y2="86.6" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stop-color="#ff9266" />
                            <stop offset="50%" stop-color="#ff6a30" />
                            <stop offset="100%" stop-color="#ff6a30" />
                        </linearGradient>
                        <linearGradient id="triangleGradient2" x1="0" y1="0" x2="50" y2="86.6" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stop-color="#ff9266" />
                            <stop offset="33%" stop-color="#ff6a30" />
                            <stop offset="66%" stop-color="#ff6a30" />
                            <stop offset="100%" stop-color="#ed4b08" />
                        </linearGradient>
                    </defs>
                    <use href="#segmentedTriangle" transform="rotate(0)" />
                    <use href="#segmentedTriangle" transform="rotate(60)" />
                    <use href="#segmentedTriangle" transform="rotate(120)" />
                    <use href="#segmentedTriangle" transform="rotate(180)" />
                    <use href="#segmentedTriangle" transform="rotate(240)" />
                    <use href="#segmentedTriangle" transform="rotate(300)" />
                    <g>
                        {data.data[0].val === 0 &&
                            (<path d="M0,0 L33,0 L16.5,28.6 Z" fill="url(#triangleGradient0)" />)}
                        {data.data[0].val === 1 &&
                            (<path d="M0,0 L66,0 L33,57.2 Z" fill="url(#triangleGradient1)" stroke="none"/>)}
                        {data.data[0].val === 2 &&
                            (<path d="M0,0 L100,0 L50,86.6 Z" fill="url(#triangleGradient2)" />)}
                        
                        <path stroke="#fff" stroke-width="1" d="M0,0 L100,0 L50,86.6 Z" fill="none" />
                    </g>    

                    <g transform="rotate(60)">
                        {data.data[1].val === 0 &&
                            (<path d="M0,0 L33,0 L16.5,28.6 Z" fill="url(#triangleGradient0)" />)}
                        {data.data[1].val === 1 &&
                            (<path d="M0,0 L66,0 L33,57.2 Z" fill="url(#triangleGradient1)" stroke="none"/>)}
                        {data.data[1].val === 2 &&
                            (<path d="M0,0 L100,0 L50,86.6 Z" fill="url(#triangleGradient2)" />)}
                        
                        <path stroke="#fff" stroke-width="1" d="M0,0 L100,0 L50,86.6 Z" fill="none" />
                    </g>

                    <g transform="rotate(120)">
                        {data.data[2].val === 0 &&
                            (<path d="M0,0 L33,0 L16.5,28.6 Z" fill="url(#triangleGradient0)" />)}
                        {data.data[2].val === 1 &&
                            (<path d="M0,0 L66,0 L33,57.2 Z" fill="url(#triangleGradient1)" stroke="none"/>)}
                        {data.data[2].val === 2 &&
                            (<path d="M0,0 L100,0 L50,86.6 Z" fill="url(#triangleGradient2)" />)}
                        
                        <path stroke="#fff" stroke-width="1" d="M0,0 L100,0 L50,86.6 Z" fill="none" />
                    </g>

                    <g transform="rotate(180)">
                        {data.data[3].val === 0 &&
                            (<path d="M0,0 L33,0 L16.5,28.6 Z" fill="url(#triangleGradient0)" />)}
                        {data.data[3].val === 1 &&
                            (<path d="M0,0 L66,0 L33,57.2 Z" fill="url(#triangleGradient1)" stroke="none"/>)}
                        {data.data[3].val === 2 &&
                            (<path d="M0,0 L100,0 L50,86.6 Z" fill="url(#triangleGradient2)" />)}
                        
                        <path stroke="#fff" stroke-width="1" d="M0,0 L100,0 L50,86.6 Z" fill="none" />
                    </g>

                    <g transform="rotate(240)">
                        {data.data[4].val === 0 &&
                            (<path d="M0,0 L33,0 L16.5,28.6 Z" fill="url(#triangleGradient0)" />)}
                        {data.data[4].val === 1 &&
                            (<path d="M0,0 L66,0 L33,57.2 Z" fill="url(#triangleGradient1)" stroke="none"/>)}
                        {data.data[4].val === 2 &&
                            (<path d="M0,0 L100,0 L50,86.6 Z" fill="url(#triangleGradient2)" />)}
                        
                        <path stroke="#fff" stroke-width="1" d="M0,0 L100,0 L50,86.6 Z" fill="none" />
                    </g>

                    <g transform="rotate(300)">
                        {data.data[5].val === 0 &&
                            (<path d="M0,0 L33,0 L16.5,28.6 Z" fill="url(#triangleGradient0)" />)}
                        {data.data[5].val === 1 &&
                            (<path d="M0,0 L66,0 L33,57.2 Z" fill="url(#triangleGradient1)" stroke="none"/>)}
                        {data.data[5].val === 2 &&
                            (<path d="M0,0 L100,0 L50,86.6 Z" fill="url(#triangleGradient2)" />)}
                        
                        <path stroke="#fff" stroke-width="1" d="M0,0 L100,0 L50,86.6 Z" fill="none" />
                    </g>
                </g>
            </svg>
        </div>
    )
}
