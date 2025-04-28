import { Book } from './book.model';

describe('Book', () => {
  it('should create an instance', () => {
    const book: Book = {
      id: 0,
      name: '0',
      category: '0',
      libraryId: 0
    };
    expect(book).toBeTruthy();
  });
});
