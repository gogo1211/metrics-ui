import { useState, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { Loader } from '../components/Loader';
import { RecordsetTable } from '../components/RecordsetTable';
import { RecordsetAddValueModal } from '../components/RecordsetAddValueModal';
import { fetchMetric, fetchRecordsetByMetric, createValueToMetricRecordset } from '../api/metrics';
import { displayDatetime } from '../utils/datetimeFormat';

/**
 * Single Metric View
 *
 */
function MetricView() {
  const { id } = useParams();
  const history = useHistory();
  const queryClient = useQueryClient();
  const { data: metric, status: metricStatus, error: metricError } = useQuery(`metric-${id}`, () => fetchMetric(id));
  const { data: recordset, status: recordsetStatus, error: recordsetError } = useQuery(`metric-recordset-${id}`, () =>
    fetchRecordsetByMetric(id)
  );
  const createMutation = useMutation((value) => createValueToMetricRecordset(id, value), {
    onMutate: async (newValue) => {
      await queryClient.cancelQueries(`metric-recordset-${id}`);
      const oldValues = queryClient.getQueryData(`metric-recordset-${id}`);
      queryClient.setQueryData(`metric-recordset-${id}`, (oldValues) => [...oldValues, newValue]);
      return { oldValues };
    },
    onSuccess: () => {
      toast.success('New value is added!');
      handleCloseModal();
    },
    onError: (error, newValue, context) => {
      toast.error('Error while adding a new value!');
      queryClient.setQueryData(`metric-recordset-${id}`, context?.oldValues);
    },
    onSettled: () => {
      queryClient.invalidateQueries();
    }
  });

  const [showModal, setShowModal] = useState(false);

  const handleBackHome = useCallback(() => {
    history.push(`/metrics`);
  }, [history]);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (data) => {
    await createMutation.mutateAsync(data);
  };

  if (metricStatus === 'loading' || recordsetStatus === 'loading') {
    return <Loader />;
  }

  if (metricStatus === 'error') {
    return `Error: ${metricError.message}`;
  }

  if (recordsetStatus === 'error') {
    return `Error: ${recordsetError.message}`;
  }

  return (
    <div className="m-3">
      <Card className="m-auto" style={{ maxWidth: '40rem' }}>
        <Card.Body>
          <Card.Title>{metric?.name || '(No name)'}</Card.Title>
          <Card.Text>{displayDatetime(metric?.timestamp)}</Card.Text>
          <Button variant="outline-primary" size="sm" onClick={handleShowModal}>
            Add new value
          </Button>
          <RecordsetTable recordset={recordset} />
        </Card.Body>
        <Card.Footer>
          <Button variant="secondary" onClick={handleBackHome}>
            Back to Metrics view
          </Button>
        </Card.Footer>
      </Card>

      <RecordsetAddValueModal show={showModal} onClose={handleCloseModal} onSubmit={handleSubmit} />
    </div>
  );
}

export { MetricView };
