import { Box, Grid2 } from "@mui/material";
import InfluencerTypeSelector from "./InfluencerTypeSelector";
import TimeRangeSelector from "./TimeRangeSelector";
import RevenueAnalysisToggle from "./RevenueAnalysisToggle";

const ResearchConfiguration = ({ newResearch, onNewResearchChange, timeRange, onTimeRangeChange, includeRevenueAnalysis, onRevenueAnalysisChange }) => {
    return (
        <Box sx={{ border: '1px solid #80808042', padding: '24px 24px', borderRadius: '8px', background: theme.palette.primary.light }}>
            <Box sx={{ mb: 4 }}>
                <InfluencerTypeSelector newResearch={newResearch} onNewResearchChange={onNewResearchChange} />
            </Box>
            <Grid2 container spacing={3}>
                <Grid2 size={6} mb={2}>
                    <TimeRangeSelector timeRange={timeRange} onTimeRangeChange={onTimeRangeChange} />
                    {/* Add other components like Influencer Name Input, Claims Input, etc. */}
                </Grid2>
                <Grid2 size={6} mb={2}>
                    <RevenueAnalysisToggle includeRevenueAnalysis={includeRevenueAnalysis} onRevenueAnalysisChange={onRevenueAnalysisChange} />
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default ResearchConfiguration;