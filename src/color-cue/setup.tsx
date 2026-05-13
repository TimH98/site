import { useState } from "react";
import Switch from "@mui/material/Switch";
import { Button, IconButton, Menu, MenuItem, Paper, TextField } from "@mui/material";
import { COLORS } from "./colors"
import CircleIcon from '@mui/icons-material/Circle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from "react-router-dom";
import { ColorCueSettings } from "./settings";

function SwitchSetting({ label, value, onChange }: { label: string, value: boolean, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <p style={{ flexGrow: 1, margin: "0.5rem" }}>{label}</p>
            <Switch onChange={onChange} checked={value} />
        </div>
    )
}

function Divider() {
    return <hr style={{ width: "100%", borderColor: "#eee", padding: 0, margin: 0 }} />
}

function ColorCard({ colorName, onDelete }: { colorName: string, onDelete: (colorName: string) => void }) {
    const colorData: any = COLORS[colorName]
    return (
        <Paper elevation={1} style={{
            margin: "0.5rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            background: "#f8f8f8",
        }}>
            <CircleIcon style={{ color: colorData.color, paddingLeft: "0.5rem" }} />
            <div style={{
                padding: "0.5rem",
                fontWeight: "bold",
                minWidth: "4rem",
            }}>
                {colorName}
            </div>
            <div style={{ flexGrow: 1 }} />
            <IconButton style={{ marginRight: "0.5rem" }} onClick={() => onDelete(colorName)}>
                <HighlightOffIcon />
            </IconButton>
        </Paper>
    )
}

export default function ColorCueSetup(
    { settings, updateSettings, onStart }:
        {
            settings: ColorCueSettings,
            updateSettings: (newSettings: ColorCueSettings) => void,
            onStart: () => void
        }) {
    const [addColorMenuOpen, setAddColorMenuOpen] = useState(false)
    const [addColorAnchorEl, setAddColorAnchorEl] = useState<null | HTMLElement>(null)
    const [liveSettings, setLiveSettings] = useState<ColorCueSettings>(settings);
    const {
        displayColors,
        displayColorNames,
        colorMatch,
        shuffle,
        displayArrows,
        randomTimeInterval,
        colors,
    } = liveSettings

    const handleDisplayColorsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        settings.displayColors = event.target.checked;
        updateSettings(settings);
        setLiveSettings({ ...settings });
    };
    const handleDisplayColorNamesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        settings.displayColorNames = event.target.checked;
        updateSettings(settings);
        setLiveSettings({ ...settings });
    };
    const handleColorMatchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        settings.colorMatch = event.target.checked;
        updateSettings(settings);
        setLiveSettings({ ...settings });
    };
    const handleShuffleColorsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        settings.shuffle = event.target.checked;
        updateSettings(settings);
        setLiveSettings({ ...settings });
    };
    const handleDisplayArrowsChange = () => {
        settings.displayArrows = (settings.displayArrows + 1) % 4;
        updateSettings(settings);
        setLiveSettings({ ...settings });
    };
    const handleRandomTimeIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        settings.randomTimeInterval = event.target.checked;
        updateSettings(settings);
        setLiveSettings({ ...settings });
    };
    const handleTimeIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        settings.minTimeInterval = +event.target.value;
        settings.maxTimeInterval = +event.target.value;
        updateSettings(settings);
        setLiveSettings({ ...settings });
    };
    const handleMinTimeIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        settings.minTimeInterval = +event.target.value;
        updateSettings(settings);
        setLiveSettings({ ...settings });
    };
    const handleMaxTimeIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        settings.maxTimeInterval = +event.target.value;
        updateSettings(settings);
        setLiveSettings({ ...settings });
    };
    const handleDeleteColor = (colorName: string) => {
        settings.colors = settings.colors.filter(c => c !== colorName);
        updateSettings(settings);
        setLiveSettings({ ...settings });
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
        settings.colors = [...settings.colors, color]
        updateSettings(settings);
        setLiveSettings({ ...settings });
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
            background: "#eee",
            minHeight: "100vh",
        }}>
            <h1 style={{ margin: "0", textAlign: "center", paddingTop: "1rem" }}>Color{"\u00A0"}Cue Reaction{"\u00A0"}Trainer</h1>
            <Paper elevation={1} style={{ width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column" }}>
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
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <p style={{ flexGrow: 1, margin: "0.5rem" }}>Display Arrows</p>
                    <Button size="small" variant="contained" style={{ margin: "0.5rem" }} onClick={handleDisplayArrowsChange}>{displayArrowsText(displayArrows)}</Button>
                </div>
                <Divider />
                <SwitchSetting label="Random Time Interval" value={randomTimeInterval} onChange={handleRandomTimeIntervalChange} />
                <Divider />
                {randomTimeInterval || <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <p style={{ flexGrow: 1, margin: "0.5rem" }}>Time Interval (seconds)</p>
                    <TextField type="number" defaultValue={3} style={{ margin: "0.5rem", minWidth: "5rem", flex: 0 }} size="small" onChange={handleTimeIntervalChange} />
                </div>}
                {randomTimeInterval && <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <p style={{ flexGrow: 1, margin: "0.5rem" }}>Time Interval (seconds)</p>
                    <TextField type="number" label="Min" defaultValue={3} style={{ margin: "0.5rem", minWidth: "5rem", flex: 0 }} size="small" onChange={handleMinTimeIntervalChange} />
                    <TextField type="number" label="Max" defaultValue={3} style={{ margin: "0.5rem", minWidth: "5rem", flex: 0 }} size="small" onChange={handleMaxTimeIntervalChange} />
                </div>}
            </Paper>
            <Paper elevation={1} style={{ width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column", padding: "0.5rem 0" }}>
                <h1 style={{ margin: "0", textAlign: "center" }}>Colors</h1>
                {
                    colors.map((col) => <ColorCard colorName={col} onDelete={handleDeleteColor} key={col} />)
                }
                {excludedColors.length > 0 && <IconButton color="primary" style={{ width: "40px", margin: "0 0.5rem" }} onClick={handleAddColorMenuOpen}>
                    <AddCircleIcon />
                </IconButton>}
            </Paper>
            <Button variant="contained" size="large" onClick={onStart}>Start</Button>
            <div style={{ color: "#666", fontStyle: "italic", marginBottom: "1rem" }}>Press and hold for 1 second to return to settings</div>
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