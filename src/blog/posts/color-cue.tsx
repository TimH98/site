export default function ColorCuePost() {
    return (
        <div>
            I created a tool to help test & train reaction time. The idea is to be like a budget <a href="https://www.blazepod.com/">Blaze Pod</a>. Set out some objects of different colors, start the trainer, and try to touch the correct object before the color changes.
            <br />
            <br />
            <a href="/#/color-cue" style={{fontWeight: 'bold'}}>Give it a try!</a>
        </div>
    )
}

export function ColorCueDevNotes() {
    return (
        <div>
            This project is a gift to my wife! She's a physical therapist and uses a similar app for her patients, but had some issues with the one she was using. So I made my own version that tailors the feature set to exactly her usecase.
            <br />
            <br />
            This is the first project on the site to use Material UI, which is long overdue. Most other projects I've made for my own enjoyment, but this one has an actual user in mind so I aimed to use a known-good design palette rather than style everything myself.
        </div>
    )
}