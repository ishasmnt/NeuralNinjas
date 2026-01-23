import { useState, useEffect } from 'react';
import { fetchAnalytics } from '../services/api';

export const useAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics()
      .then(res => setData(res))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
};