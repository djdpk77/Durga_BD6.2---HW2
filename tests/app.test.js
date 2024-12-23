let { app, getMovies, getMovieById, addMovie } = require('../index.js');
let http = require('http');

jest.mock('../index.js', () => ({
  ...jest.requireActual('../index.js'),
  getMovies: jest.fn(),
  getMovieById: jest.fn(),
  addMovie: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Function tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getMovies should return a list of movies', () => {
    const mockMovies = [
      { id: 1, title: 'The Shawshank Redemption', year: 1994 },
      { id: 2, title: 'The Godfather', year: 1972 },
    ];

    getMovies.mockReturnValue(mockMovies);

    let result = getMovies();
    expect(result).toEqual(mockMovies);
    expect(getMovies).toHaveBeenCalled();
  });

  test('getMovieById should return the movie details', () => {
    const mockMovie = { id: 1, title: 'The Shawshank Redemption', year: 1994 };

    getMovieById.mockReturnValue(mockMovie);

    let result = getMovieById(1);
    expect(result).toEqual(mockMovie);
    expect(getMovieById).toHaveBeenCalledWith(1);
  });

  test('getMovieById should return undefined for a non-existent movie', () => {
    getMovieById.mockReturnValue(undefined);

    let result = getMovieById(99);
    expect(result).toBeUndefined();
    expect(getMovieById).toHaveBeenCalledWith(99);
  });

  test('addMovie should add a new movie', () => {
    const newMovie = { id: 4, title: 'Pulp Fiction', year: 1994 };

    addMovie.mockReturnValue(newMovie);

    let result = addMovie(newMovie);
    expect(result).toEqual(newMovie);
    expect(addMovie).toHaveBeenCalledWith(newMovie);
  });
});
