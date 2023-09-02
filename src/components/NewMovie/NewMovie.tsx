import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type NewMovieProps = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [inputTitle, setTitle] = useState('');
  const [inputDescription, setDescription] = useState('');
  const [inputImageUrl, setImageUrl] = useState('');
  const [inputImdbUrl, setImdbUrl] = useState('');
  const [inputImdbId, setImdbId] = useState('');

  const [isImageUrlValid, setImageUrlValid] = useState(true);
  const [isImdbUrlValid, setImdbUrlValid] = useState(true);

  const isFormValid
  = inputTitle.trim() !== ''
  && inputImageUrl.trim() !== ''
  && inputImdbUrl.trim() !== ''
  && inputImdbId.trim() !== ''
  && isImageUrlValid
  && isImdbUrlValid;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovieFromForm = {
      title: inputTitle,
      description: inputDescription,
      imgUrl: inputImageUrl,
      imdbUrl: inputImdbUrl,
      imdbId: inputImdbId,
    };

    onAdd(newMovieFromForm);

    setTitle('');
    setDescription('');
    setImageUrl('');
    setImdbUrl('');
    setImdbId('');
    setCount(count + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={inputTitle}
        onChange={setTitle}
        validateNoExtraWhitespace
        required
      />

      <TextField
        name="description"
        label="Description"
        value={inputDescription}
        onChange={setDescription}
        validateNoExtraWhitespace
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={inputImageUrl}
        onChange={setImageUrl}
        validateUrl
        setIsValid={setImageUrlValid}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={inputImdbUrl}
        onChange={setImdbUrl}
        validateUrl
        setIsValid={setImdbUrlValid}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={inputImdbId}
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};