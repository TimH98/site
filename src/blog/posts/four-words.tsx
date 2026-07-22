export default function FourWordsPost() {
    return (
        <div>
            <a href="/#/four-words/build" style={{fontWeight: 'bold'}}>Play Now</a>
            <br />
            <br />
            This is a web implementation of <a href="https://boardgamegeek.com/boardgame/329839/so-clover">So Clover</a>, a cooperative word game.
            <h3>How to Play</h3>
            The Builder will receive a board with several words on it and four spaces to write clues around the edges of the board. Your goal is to come up with a one-word clue that links the two words on each side, for example if one edge has "Club" and "Band" you might write "Music".
            <br />
            <br />
            Once you have all four clues written, click "Share Puzzle" and a share link will be copied to your clipboard for you to send to a friend.
            <br />
            <br />
            On the Solver's side, you'll see the clues the Builder has written along with five cards - the four cards the Builder saw plus one extra. The Solver's goal is to correctly place the cards in the grid using the Builder's clues.
            <br />
            <br />
            Once you're confident with your guess, click Submit and any correct cards will be highlighted. Try to solve the puzzle in 2 tries or less!
            <h3>Controls</h3>
            Builder: 
            <ul>
                <li>Simply click and type your clues</li>
            </ul>
            Solver:
            <ul>
                <li>Click and drag to move a card</li>
                <li>Click a card to rotate it</li>    
            </ul>
            <i>(Note: The game is not mobile-friendly yet. Coming soon!)</i>
        </div>
    )
}