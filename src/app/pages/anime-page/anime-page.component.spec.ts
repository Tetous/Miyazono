import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimePage } from './anime-page.component';

describe('AnimePageComponent', () => {
  let component: AnimePage;
  let fixture: ComponentFixture<AnimePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimePage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
