import { useState, useMemo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { Loader } from '../components/Loader';
import { fetchAllMetrics, createMetric, deleteMetric } from '../api/metrics';
import { MetricCreateModal } from '../components/MetricCreateModal';

/**
 * Metrics Grid View
 *
 */
export function MetricGrid() {
  const history = useHistory();
  const queryClient = useQueryClient();
  const { status, data, error } = useQuery('metrics', fetchAllMetrics);
  const deleteMutation = useMutation(deleteMetric, {
    onMutate: async (id) => {
      await queryClient.cancelQueries('metrics');
      const oldMetrics = queryClient.getQueryData('metrics');
      queryClient.setQueryData('metrics', (metrics) => metrics.filter((item) => item.id !== id));
      return { oldMetrics };
    },
    onSuccess: () => {
      toast.success('Metric is deleted!');
    },
    onError: (error, id, context) => {
      toast.error('Error while deleting metric!');
      queryClient.setQueryData('metrics', context?.oldMetrics);
    },
    onSettled: () => {
      queryClient.invalidateQueries('metrics');
    }
  });
  const createMutation = useMutation(createMetric, {
    onMutate: async (newMetric) => {
      await queryClient.cancelQueries('metrics');
      const oldMetrics = queryClient.getQueryData('metrics');
      queryClient.setQueryData('metrics', (oldMetrics) => [...oldMetrics, newMetric]);
      return { oldMetrics };
    },
    onSuccess: () => {
      toast.success('New metric is created!');
      handleCloseModal();
    },
    onError: (error, newMetric, context) => {
      toast.error('Error while creating a new metric!');
      queryClient.setQueryData('metrics', context?.oldMetrics);
    },
    onSettled: () => {
      queryClient.invalidateQueries();
    }
  });

  const [showModal, setShowModal] = useState(false);

  const handleOpen = useCallback(
    (metric) => () => {
      history.push(`/metrics/${metric.id}`);
    },
    [history]
  );

  const handleDelete = useCallback(
    (metric) => (e) => {
      e.stopPropagation();
      deleteMutation.mutate(metric.id);
    },
    [deleteMutation]
  );

  const handleShowModal = useCallback(() => {
    setShowModal(true);
  }, [setShowModal]);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  const handleSubmit = async (data) => {
    await createMutation.mutateAsync(data);
  };

  const metrics = useMemo(
    () =>
      data?.map((metric) => (
        <Col key={metric.id}>
          <Card className="my-1">
            <Card.Body>
              <Card.Title>{metric.name}</Card.Title>
              <Button variant="outline-primary" size="sm" onClick={handleOpen(metric)}>
                Open
              </Button>
              <Button className="ms-2" variant="outline-danger" size="sm" onClick={handleDelete(metric)}>
                Delete
              </Button>
            </Card.Body>
          </Card>
        </Col>
      )),
    [data, handleOpen, handleDelete]
  );

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'error') {
    return <div>error: {error.message}</div>;
  }

  return (
    <>
      <Row>
        <Col>
          <h1>Metrics</h1>
        </Col>
        <Col xs="auto">
          <Button type="button" onClick={handleShowModal}>
            Create new metric
          </Button>
        </Col>
      </Row>
      <Row xs={1} sm={2} md={3} lg={4}>
        {metrics}
      </Row>

      <MetricCreateModal show={showModal} onClose={handleCloseModal} onSubmit={handleSubmit} />
    </>
  );
}
