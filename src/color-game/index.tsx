import { useState } from "react";
import Switch from "@mui/material/Switch";
import { Button, IconButton, Menu, MenuItem, Paper, TextField } from "@mui/material";
import { COLORS } from "./colors"
import CircleIcon from '@mui/icons-material/Circle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from "react-router-dom";

function SwitchSetting({label, startChecked, onChange}: {label: string, startChecked?: boolean, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void}) {
    return (
        <div style={{display: "flex", flexDirection: "row"}}>
            <p style={{flexGrow: 1, margin: "0.5rem"}}>{label}</p>
            <Switch onChange={onChange} defaultChecked={startChecked} />
        </div>
    )
}

function Divider() {
    return <hr style={{width: "100%", borderColor: "#eee", padding: 0, margin: 0}} />
}

function ColorCard({colorName, onDelete}: {colorName: string, onDelete: (colorName: string) => void}) {
    const colorData: any = COLORS[colorName]
    return (
        <Paper elevation={1} style={{
            margin: "0.5rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
        }}>
            <CircleIcon style={{color: colorData.color, paddingLeft: "0.5rem"}}/>
            <div style={{
                padding: "0.5rem",
                fontWeight: "bold",
                background: "#fff9",
                minWidth: "4rem",
            }}>
                {colorName}
            </div>
            <div style={{flexGrow: 1}} />
            <IconButton style={{marginRight: "0.5rem"}} onClick={() => onDelete(colorName)}>
                <HighlightOffIcon />
            </IconButton>
        </Paper>
    )
}

export default function ColorGameSetup() {
    const navigate = useNavigate();
    const [displayColors, setDisplayColors] = useState(true)
    const [displayColorNames, setDisplayColorNames] = useState(true)
    const [colorMatch, setColorMatch] = useState(true)
    const [shuffle, setShuffle] = useState(true)
    const [displayArrows, setDisplayArrows] = useState(0)
    const [timeInterval, setTimeInterval] = useState(3.0)
    const [colors, setColors] = useState(["Red", "Green", "Blue", "Yellow"])
    const [addColorMenuOpen, setAddColorMenuOpen] = useState(false)
    const [addColorAnchorEl, setAddColorAnchorEl] = useState<null | HTMLElement>(null)

    const handleDisplayColorsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDisplayColors(event.target.checked);
    };
    const handleDisplayColorNamesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDisplayColorNames(event.target.checked);
    };
    const handleColorMatchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColorMatch(event.target.checked);
    };
    const handleShuffleColorsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShuffle(event.target.checked);
    };
    const handleDisplayArrowsChange = () => {
        setDisplayArrows((displayArrows + 1) % 4);
    };
    const handleTimeIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTimeInterval(+event.target.value);
    };
    const handleDeleteColor = (colorName: string) => {
        setColors(colors.filter(c => c !== colorName))
    }

    const handleAddColorMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAddColorAnchorEl(event.currentTarget)
        setAddColorMenuOpen(true)
    }

    const handleAddColorMenuClose = () => {
        setAddColorAnchorEl(null)
        setAddColorMenuOpen(false)
    }

    const handleAddColor = (color: string) => {
        setColors([...colors, color])
        setAddColorMenuOpen(false)
    }

    const onStart = () => {
        navigate('/color-game/game', { state: {
            displayColors,
            displayColorNames,
            colorMatch,
            shuffle,
            displayArrows,
            timeInterval,
            colors
        } })
    }

    const displayArrowsText = (n: number) => {
        if (n === 0) return "None";
        if (n === 1) return "←→"
        if (n === 2) return "↑↓"
        return "↑↓←→"
    }
    const excludedColors = Object.keys(COLORS).filter((c) => !colors.includes(c))

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
            padding: "1rem",
            background: "#eee",
            minHeight: "100vh",
        }}>
            <h1 style={{margin: "0", textAlign: "center"}}>Color Game</h1>
            <Paper elevation={1} style={{width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column"}}>
                <SwitchSetting label="Display Colors" onChange={handleDisplayColorsChange} startChecked />
                <Divider />
                <SwitchSetting label="Display Color Names" onChange={handleDisplayColorNamesChange} startChecked />
                <Divider />
                <SwitchSetting label="Color Names Match Screen Color" onChange={handleColorMatchChange} startChecked />
                <Divider />
                <SwitchSetting label="Shuffle Colors" onChange={handleShuffleColorsChange} startChecked />
                <Divider />
                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <p style={{flexGrow: 1, margin: "0.5rem"}}>Display Arrows</p>
                    <Button size="small" variant="contained" style={{margin: "0.5rem"}} onClick={handleDisplayArrowsChange}>{displayArrowsText(displayArrows)}</Button>
                </div>
                <Divider />
                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <p style={{flexGrow: 1, margin: "0.5rem"}}>Time Interval (s)</p>
                    <TextField type="number" defaultValue={3} style={{margin: "0.5rem", minWidth: "5rem", flex: 0}} size="small" onChange={handleTimeIntervalChange} />
                </div>
            </Paper>
            <Paper elevation={1} style={{width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column", padding: "0.5rem 0"}}>
                <h1 style={{margin: "0", textAlign: "center"}}>Colors</h1>
                {
                    colors.map((col) => <ColorCard colorName={col} onDelete={handleDeleteColor} key={col} />)
                }
                {excludedColors.length > 0 && <IconButton color="primary" style={{width: "40px", margin: "0 0.5rem"}} onClick={handleAddColorMenuOpen}>
                    <AddCircleIcon />
                </IconButton>}
            </Paper>
            <Button variant="contained" size="large" onClick={onStart}>Start</Button>
            {/* "Add Color" dropdown */}
            <Menu
                open={addColorMenuOpen}
                onClose={handleAddColorMenuClose}
                anchorEl={addColorAnchorEl}
            >
                {excludedColors.map((c) => <MenuItem onClick={() => handleAddColor(c)} key={c}>{c}</MenuItem>)}
            </Menu>
        </div>
    )
}