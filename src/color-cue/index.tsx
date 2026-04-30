import { useState } from "react";
import Switch from "@mui/material/Switch";
import { Button, IconButton, Menu, MenuItem, Paper, TextField } from "@mui/material";
import { COLORS } from "./colors"
import CircleIcon from '@mui/icons-material/Circle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from "react-router-dom";

function SwitchSetting({label, value, onChange}: {label: string, value: boolean, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void}) {
    return (
        <div style={{display: "flex", flexDirection: "row"}}>
            <p style={{flexGrow: 1, margin: "0.5rem"}}>{label}</p>
            <Switch onChange={onChange} checked={value} />
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
            alignItems: "center",
            background: "#f8f8f8",
        }}>
            <CircleIcon style={{color: colorData.color, paddingLeft: "0.5rem"}}/>
            <div style={{
                padding: "0.5rem",
                fontWeight: "bold",
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

export default function ColorCueSetup() {
    const navigate = useNavigate();
    const [displayColors, setDisplayColors] = useState(true)
    const [displayColorNames, setDisplayColorNames] = useState(true)
    const [colorMatch, setColorMatch] = useState(true)
    const [shuffle, setShuffle] = useState(true)
    const [displayArrows, setDisplayArrows] = useState(0)
    const [randomTimeInterval, setRandomTimeInterval] = useState(false)
    const [minTimeInterval, setMinTimeInterval] = useState(3.0)
    const [maxTimeInterval, setMaxTimeInterval] = useState(3.0)
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
    const handleRandomTimeIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRandomTimeInterval(event.target.checked);
    };
    const handleTimeIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMinTimeInterval(+event.target.value);
        setMaxTimeInterval(+event.target.value);
    };
     const handleMinTimeIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMinTimeInterval(+event.target.value);
    };
    const handleMaxTimeIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaxTimeInterval(+event.target.value);
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
        navigate('/color-cue/start', { state: {
            displayColors,
            displayColorNames,
            colorMatch,
            shuffle,
            displayArrows,
            minTimeInterval,
            maxTimeInterval,
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
            <h1 style={{margin: "0", textAlign: "center"}}>Color{"\u00A0"}Cue Reaction{"\u00A0"}Trainer</h1>
            <Paper elevation={1} style={{width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column"}}>
                <SwitchSetting label="Display Colors" value={displayColors} onChange={handleDisplayColorsChange} />
                <Divider />
                <SwitchSetting label="Display Color Names" value={displayColorNames} onChange={handleDisplayColorNamesChange} />
                <Divider />
                {displayColors && displayColorNames && (
                    <>
                        <SwitchSetting label="Color Names Match Display Color" value={colorMatch} onChange={handleColorMatchChange} />
                        <Divider />
                    </>
                )}
                <SwitchSetting label="Shuffle Colors" value={shuffle} onChange={handleShuffleColorsChange} />
                <Divider />
                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <p style={{flexGrow: 1, margin: "0.5rem"}}>Display Arrows</p>
                    <Button size="small" variant="contained" style={{margin: "0.5rem"}} onClick={handleDisplayArrowsChange}>{displayArrowsText(displayArrows)}</Button>
                </div>
                <Divider />
                <SwitchSetting label="Random Time Interval" value={randomTimeInterval} onChange={handleRandomTimeIntervalChange} />
                <Divider />
                {randomTimeInterval || <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <p style={{flexGrow: 1, margin: "0.5rem"}}>Time Interval (seconds)</p>
                    <TextField type="number" defaultValue={3} style={{margin: "0.5rem", minWidth: "5rem", flex: 0}} size="small" onChange={handleTimeIntervalChange} />
                </div>}
                {randomTimeInterval && <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <p style={{flexGrow: 1, margin: "0.5rem"}}>Time Interval (seconds)</p>
                    <TextField type="number" label="Min" defaultValue={3} style={{margin: "0.5rem", minWidth: "5rem", flex: 0}} size="small" onChange={handleMinTimeIntervalChange} />
                    <TextField type="number" label="Max" defaultValue={3} style={{margin: "0.5rem", minWidth: "5rem", flex: 0}} size="small" onChange={handleMaxTimeIntervalChange} />
                </div>}
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