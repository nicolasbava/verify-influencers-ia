import { Grid2, Typography } from "@mui/material";
import { StyledButton } from "./StyledComponents";

const TimeRangeSelector = ({ timeRange, onTimeRangeChange }) => {
    return (
        <Box mb={3}>
            <Typography mb={1}>Time Range</Typography>
            <Grid2 container spacing={1}>
                {Object.values(TimeRange).map((range) => (
                    <Grid2 key={range} size={6}>
                        <StyledButton
                            active={timeRange === range}
                            onClick={() => onTimeRangeChange(range)}
                        >
                            {range.replace("_", " ")}
                        </StyledButton>
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
};

export default TimeRangeSelector;