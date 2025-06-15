import React from 'react';
import { useGetApplicationsForJobPostingQuery } from '../../Apis/jobApplicationApi';
import { useParams, useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Button, Typography, CircularProgress } from '@mui/material';

const ApplicantsPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

  const { data: applicantsData, isLoading, error } = useGetApplicationsForJobPostingQuery(jobId || '');
  
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !applicantsData) {
    return (
      <Typography color="error" align="center" mt={5}>
        Error fetching applicants
      </Typography>
    );
  }

  const { result } = applicantsData;
console.log(result);
  const columns: GridColDef[] = [
    {
      field: 'fullName',
      headerName: 'Name',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          color="primary"
          onClick={() => navigate(`/company/getUserProfilePage/${params.row.userId}`)}
        >
          {params.value}
        </Button>
      ),
    },
    { field: 'address', headerName: 'Address', flex: 1 },
    { field: 'expectedSalary', headerName: 'Expected Salary', flex: 1 },
    {
      field: 'resumeUrl',
      headerName: 'Resume',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <a
          href={params.value}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#1976d2' }}
        >
          View Resume
        </a>
      ),
    },
    { field: 'coverLetter', headerName: 'Cover Letter', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    {
      field: 'applicationDate',
      headerName: 'Date Applied',
      flex: 1,
      valueFormatter: (params) => {
      return new Date(params).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }); // 👉 "06 Jan 2025"
    },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() =>
            navigate(`/company/singleJobDetailsPage/${params.row.jobApplicationId}`)
          }
        >
          Manage Status
        </Button>
      ),
    },
  ];

  const rows = result.map((applicant: any, index: number) => ({
    id: index,
    ...applicant,
  }));

  return (
    <Box p={4} pt={4} pb={6} maxWidth="1000px" mx="auto" boxShadow={3} bgcolor="smoke-white" borderRadius={2}>
      <Typography variant="h4" gutterBottom>
        Applicants for Job
      </Typography>

      {result.length === 0 ? (
        <Typography variant="body1" color="textSecondary" align="center" mt={5}>
          No one has applied for this job yet.
        </Typography>
      ) : (
        <Box mt={2} style={{ height: 600, width: '100%' }}>
         <DataGrid
  rows={rows}
  columns={columns}
  initialState={{
    pagination: {
      paginationModel: {
        pageSize: 8,
        page: 0,
      },
    },
  }}
  pageSizeOptions={[8]}
  disableRowSelectionOnClick
  sx={{ borderRadius: 2 }}
/>
        </Box>
      )}
    </Box>
  );
};

export default ApplicantsPage;
