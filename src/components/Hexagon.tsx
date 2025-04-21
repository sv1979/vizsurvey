import { HexagonData } from "../types"

type SvgLabelProps = {
    text: string;
    x?: number;
    y?: number;
    moveUp?: boolean;
    moveDown?: boolean;
    active?: boolean;
};

type Props = {
    data: HexagonData,
    currentIndex: number
}

export const Hexagon = ({ data, currentIndex }: Props) => {
    const SvgLabel: React.FC<SvgLabelProps> = ({
        text,
        x = 0,
        y = 0,
        moveUp = false,
        moveDown = false,
        active = false
    }) => {
        const fontSize = 9;
        const lineHeight = fontSize * 1.2;

        const words = text.trim().split(" ");
        let firstLine = words.slice(0, Math.ceil(words.length / 2)).join(" ");
        let secondLine = words.slice(Math.ceil(words.length / 2)).join(" ");

        const splitLongLine = (line: string) => {
            const splitWords = line.split(" ");
            if (line.length > 15 && splitWords.length > 1) {
                const mid = Math.ceil(splitWords.length / 2);
                return [
                    splitWords.slice(0, mid).join(" "),
                    splitWords.slice(mid).join(" ")
                ];
            }
            return [line];
        };

        const lines: string[] = [
            ...splitLongLine(firstLine),
            ...(secondLine ? splitLongLine(secondLine) : [])
        ];

        let adjustedY = y;

        if (moveUp && lines.length > 2) {
            adjustedY -= 5;
        } else if (moveDown && lines[0].length > 9) {
            adjustedY += 5;
        }

        const paddingX = 4;
        const paddingY = 2;
        const boxHeight = lines.length * lineHeight + paddingY * 4;
        const boxWidth = Math.max(...lines.map(line => line.length)) * (fontSize * 0.6) + paddingX * 2;
        const boxX = x - boxWidth / 2;
        const boxY = adjustedY - fontSize + (lines.length === 1 ? -paddingY : -paddingY * 2);

        return (
            <>
                {active && (
                    <rect
                        x={boxX}
                        y={boxY}
                        width={boxWidth}
                        height={boxHeight}
                        rx={4}
                        ry={4}
                        fill="#fde2d8"
                        opacity={0.9}
                    />
                )}

                <text
                    className={`svg-text-desktop${active ? " active" : ""}`}
                    fontFamily="'Soleto Bold', sans-serif"
                    fontSize="9"
                    fill="#181818"
                    x={x}
                    y={adjustedY}
                    textAnchor="middle"
                >

                    {lines.map((line, j) => (
                        <tspan
                            key={`main-${j}`}
                            x={x}
                            dy={j === 0 ? "0em" : "1.2em"}
                        >
                            {line}
                        </tspan>
                    ))}
                </text>
            </>

        );
    };

    return (
        <div className="hexagon">
            <svg viewBox="-180 -130 360 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
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
                    <use href="#segmentedTriangle" transform="rotate(30)" />
                    <use href="#segmentedTriangle" transform="rotate(90)" />
                    <use href="#segmentedTriangle" transform="rotate(150)" />
                    <use href="#segmentedTriangle" transform="rotate(210)" />
                    <use href="#segmentedTriangle" transform="rotate(270)" />
                    <use href="#segmentedTriangle" transform="rotate(330)" />
                    <g transform="rotate(-30)">
                        {data.data[0].val === 0 &&
                            (<path d="M0,0 L33,0 L16.5,28.6 Z" fill="url(#triangleGradient0)" />)}
                        {data.data[0].val === 1 &&
                            (<path d="M0,0 L66,0 L33,57.2 Z" fill="url(#triangleGradient1)" stroke="none" />)}
                        {data.data[0].val === 2 &&
                            (<path d="M0,0 L100,0 L50,86.6 Z" fill="url(#triangleGradient2)" />)}

                        <path stroke="#fff" stroke-width="1" d="M0,0 L100,0 L50,86.6 Z" fill="none" />
                    </g>

                    <g transform="rotate(30)">
                        {data.data[1].val === 0 &&
                            (<path d="M0,0 L33,0 L16.5,28.6 Z" fill="url(#triangleGradient0)" />)}
                        {data.data[1].val === 1 &&
                            (<path d="M0,0 L66,0 L33,57.2 Z" fill="url(#triangleGradient1)" stroke="none" />)}
                        {data.data[1].val === 2 &&
                            (<path d="M0,0 L100,0 L50,86.6 Z" fill="url(#triangleGradient2)" />)}

                        <path stroke="#fff" stroke-width="1" d="M0,0 L100,0 L50,86.6 Z" fill="none" />
                    </g>

                    <g transform="rotate(90)">
                        {data.data[2].val === 0 &&
                            (<path d="M0,0 L33,0 L16.5,28.6 Z" fill="url(#triangleGradient0)" />)}
                        {data.data[2].val === 1 &&
                            (<path d="M0,0 L66,0 L33,57.2 Z" fill="url(#triangleGradient1)" stroke="none" />)}
                        {data.data[2].val === 2 &&
                            (<path d="M0,0 L100,0 L50,86.6 Z" fill="url(#triangleGradient2)" />)}

                        <path stroke="#fff" stroke-width="1" d="M0,0 L100,0 L50,86.6 Z" fill="none" />
                    </g>

                    <g transform="rotate(150)">
                        {data.data[3].val === 0 &&
                            (<path d="M0,0 L33,0 L16.5,28.6 Z" fill="url(#triangleGradient0)" />)}
                        {data.data[3].val === 1 &&
                            (<path d="M0,0 L66,0 L33,57.2 Z" fill="url(#triangleGradient1)" stroke="none" />)}
                        {data.data[3].val === 2 &&
                            (<path d="M0,0 L100,0 L50,86.6 Z" fill="url(#triangleGradient2)" />)}

                        <path stroke="#fff" stroke-width="1" d="M0,0 L100,0 L50,86.6 Z" fill="none" />
                    </g>

                    <g transform="rotate(210)">
                        {data.data[4].val === 0 &&
                            (<path d="M0,0 L33,0 L16.5,28.6 Z" fill="url(#triangleGradient0)" />)}
                        {data.data[4].val === 1 &&
                            (<path d="M0,0 L66,0 L33,57.2 Z" fill="url(#triangleGradient1)" stroke="none" />)}
                        {data.data[4].val === 2 &&
                            (<path d="M0,0 L100,0 L50,86.6 Z" fill="url(#triangleGradient2)" />)}

                        <path stroke="#fff" stroke-width="1" d="M0,0 L100,0 L50,86.6 Z" fill="none" />
                    </g>

                    <g transform="rotate(270)">
                        {data.data[5].val === 0 &&
                            (<path d="M0,0 L33,0 L16.5,28.6 Z" fill="url(#triangleGradient0)" />)}
                        {data.data[5].val === 1 &&
                            (<path d="M0,0 L66,0 L33,57.2 Z" fill="url(#triangleGradient1)" stroke="none" />)}
                        {data.data[5].val === 2 &&
                            (<path d="M0,0 L100,0 L50,86.6 Z" fill="url(#triangleGradient2)" />)}

                        <path stroke="#fff" stroke-width="1" d="M0,0 L100,0 L50,86.6 Z" fill="none" />
                    </g>

                    <g>
                        <text className="svg-text-mobile" x="100" y="5" text-anchor="middle" font-family="'Soleto Bold', sans-serif" font-size="18" fill="#181818">1</text>
                        <text className="svg-text-mobile" x="52" y="90" text-anchor="middle" font-family="'Soleto Bold', sans-serif" font-size="18" fill="#181818">2</text>
                        <text className="svg-text-mobile" x="-52" y="90" text-anchor="middle" font-family="'Soleto Bold', sans-serif" font-size="18" fill="#181818">3</text>
                        <text className="svg-text-mobile" x="-100" y="5" text-anchor="middle" font-family="'Soleto Bold', sans-serif" font-size="18" fill="#181818">4</text>
                        <text className="svg-text-mobile" x="-52" y="-80" text-anchor="middle" font-family="'Soleto Bold', sans-serif" font-size="18" fill="#181818">5</text>
                        <text className="svg-text-mobile" x="52" y="-80" text-anchor="middle" font-family="'Soleto Bold', sans-serif" font-size="18" fill="#181818">6</text>
                    </g>

                    <g>
                        <SvgLabel text={data.data[0].title} x={130} y={0} active={currentIndex === 0} />
                        <SvgLabel text={data.data[1].title} x={55} y={100} active={currentIndex === 1} moveDown={true} />
                        <SvgLabel text={data.data[2].title} x={-55} y={100} active={currentIndex === 2} moveDown={true} />
                        <SvgLabel text={data.data[3].title} x={-130} y={0} active={currentIndex === 3} />
                        <SvgLabel text={data.data[4].title} x={-60} y={-105} active={currentIndex === 4} moveUp={true} />
                        <SvgLabel text={data.data[5].title} x={60} y={-105} active={currentIndex === 5} moveUp={true} />
                    </g>
                </g>
            </svg>
        </div>
    )
}
