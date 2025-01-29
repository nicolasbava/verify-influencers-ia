// import { useState } from "react";
// import { Box, Button, Grid2, Modal, Typography } from "@mui/material";
// // import { StyledButton, CustomTextField, StyledBox } from "./StyledComponents";

// const JournalSelector = ({ journals, onToggleJournal, onAddJournal }) => {
//     const [open, setOpen] = useState(false);
//     const [newJournal, setNewJournal] = useState("");

//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);

//     const handleAddJournal = () => {
//         onAddJournal(newJournal);
//         setNewJournal("");
//         handleClose();
//     };

//     return (
//         <Box mb={2}>
//             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                 <Typography>Specific Journals</Typography>
//                 <Box sx={{ display: 'flex', alignItems: 'center', color: 'secondary.light' }}>
//                     <Button sx={{ color: 'secondary.light', textTransform: 'capitalize' }}>Select All</Button>
//                     <span>|</span>
//                     <Button sx={{ color: 'secondary.light', textTransform: 'capitalize' }}>Deselect All</Button>
//                 </Box>
//             </Box>
//             <Grid2 container spacing={1} mb={2}>
//                 {journals.map((journal, index) => (
//                     <Grid2 key={journal.name} size={6}>
//                         <StyledButton
//                             active={journal.selected}
//                             onClick={() => onToggleJournal(index)}
//                             fullWidth
//                         >
//                             {journal.name}
//                         </StyledButton>
//                     </Grid2>
//                 ))}
//             </Grid2>
//             <Button onClick={handleOpen} sx={{ color: 'secondary.light', textTransform: 'capitalize' }}>+ Add New Journal</Button>

//             <Modal open={open} onClose={handleClose}>
//                 <Box sx={style}>
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//                         <Typography mb={1} variant="h6" component="h2">Add New Journal</Typography>
//                         <Typography sx={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={handleClose}>X</Typography>
//                     </Box>
//                     <CustomTextField
//                         onChange={(e) => setNewJournal(e.target.value)}
//                         size="small"
//                         fullWidth
//                         placeholder="Journal"
//                         variant="outlined"
//                     />
//                     <Button onClick={handleAddJournal} sx={{ mt: 2 }} variant="contained">Add Journal</Button>
//                 </Box>
//             </Modal>
//         </Box>
//     );
// };

// export default JournalSelector;