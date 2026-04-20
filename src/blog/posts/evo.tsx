

export default function EvoPost() {
    return (
        <div>
            <br />
            <a href="/#/evo" style={{fontWeight: 'bold'}}>Start in browser</a>
            <br />
            <br />
            <b>Evo</b> is a sandbox for demonstrating natural selection on a population. It's also just super fun to watch. Creatures move around, eat plants or smaller creatures, reproduce, and die. Over time, the general population becomes better at surviving.
            <br />
            <br />
            Creatures have an <b>energy</b> level that is increased by eating and decreased by moving or mating. If the energy level reaches 0, it dies. Creatures also have a number of genes:
            <br />
            <br />
            <style>{`
                table, td {
                    border: 1px solid black;
                    border-collapse: collapse;
                }
                td {
                    padding: 0.5rem;
                }
            `}</style>
            <table>
                <tr>
                    <td><b>Size</b></td>
                    <td>Determines how much energy is required to move, and what sizes of creatures this creature can mate with, eat, or be eaten by.</td>
                </tr>
                <tr>
                    <td><b>Move Rate</b></td>
                    <td>How often this creature pushes itself to move around.</td>
                </tr>
                <tr>
                    <td><b>Move Strength</b></td>
                    <td>How much speed this creature gains when it pushes itself. Creatures with higher Move Strength burn more energy on each push.</td>
                </tr>
                <tr>
                    <td><b>Breed Energy</b></td>
                    <td>When a creature's energy is above this threshold, it will turn red and start looking for a similarly-sized nearby creature to mate with. When two red creatures intersect, they create a child with genes based on the parents.</td>
                </tr>
                <tr>
                    <td><b>Child Energy</b></td>
                    <td>How much energy this creature gives to its child when it mates. If this is low, it will have a large number of weak children. If this is high, it'll give a significant portion of its energy to its child, possibly dying shortly after. Child Energy is always less than Breed Energy.</td>
                </tr>
            </table>
            <br />
            Evo includes several options to tweak the environment the creatures live in, such as how much energy plants give, how far creatures can see, and how much energy it costs to move. In the settings panel, you can hover over each option to see what it does.
        </div>
    )
}

export function EvoDevNotes() {
    return (
        <div>
            This is a reimplementation of an ancient project of mine, dating back to at least 2021. The <a href="https://github.com/TimH98/NaturalSelection">initial implementation</a> was in <a href="https://processing.org/">Processing</a>, a language purpose-built to make drawing visualizations to the screen easy.
            <br />
            <br />
            Unfortunately, the old project wasn't exactly easy to spin up and explore, so I figured my new site (and my new proficiency in HTML5) is a good opportunity to make it more accessible. I also added a settings window - the old project included all of these in a config file, which is sort of a pain to modify. There were a couple other minor changes too, like adding outlines to everything to make it easier to look at.
            <br />
            <br />
            The simulation is pretty simple as far as predator-prey dynamics. I considered sprucing it up with attributes like poison, flying, ranged attacks, etc but each of those has so many inherent variables that the settings pane would explode in size. 
        </div>
    )
}