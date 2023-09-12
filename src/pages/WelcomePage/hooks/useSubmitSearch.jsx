import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useSubmitSearch() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim().length > 0) {
      navigate(`/search/${search}`);
    }
  };

  return { setSearch, handleSubmit, search };
}
