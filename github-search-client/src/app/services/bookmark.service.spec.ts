import { TestBed } from '@angular/core/testing';

import { Bookmark } from './bookmark.service';

describe('Bookmark', () => {
  let service: Bookmark;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Bookmark);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
