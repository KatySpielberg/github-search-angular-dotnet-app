import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoCard } from './repo-card';

describe('RepoCard', () => {
  let component: RepoCard;
  let fixture: ComponentFixture<RepoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepoCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
