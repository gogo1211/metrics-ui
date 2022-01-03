import axios from '../utils/axiosClient';

/**
 * Get all Metrics
 *
 */
export const fetchAllMetrics = async () => {
  const res = await axios.get('/metrics');
  return res.data?.metrics;
};

/**
 * Create a new Metric
 *
 * @param {object} data - { name: string }
 */
export const createMetric = async (data) => {
  const res = await axios.post(`/metrics`, data);
  return res.data;
};

/**
 * Get a single Metric
 *
 * @param {number} id
 */
export const fetchMetric = async (id) => {
  const res = await axios.get(`/metrics/${id}`);
  return res.data;
};

/**
 * Update a Metric
 *
 * @param {number} id
 * @param {object} data - { name: string }
 */
export const updateMetric = async (id, data) => {
  const res = await axios.put(`/metrics/${id}`, data);
  return res.data;
};

/**
 * Delete a Metric
 *
 * @param {number} id
 */
export const deleteMetric = async (id) => {
  const res = await axios.delete(`/metrics/${id}`);
  return res.data;
};

/**
 * Get a recordset for a Metric
 *
 * @param {number} id
 */
export const fetchRecordsetByMetric = async (id) => {
  const res = await axios.get(`/metrics/${id}/recordset`);
  return res.data?.values;
};

/**
 * Add a value to metric recordset
 *
 * @param {number} id
 * @param {object} data - { value: number }
 */
export const createValueToMetricRecordset = async (id, data) => {
  const res = await axios.post(`/metrics/${id}/recordset`, data);
  return res.data;
};
