import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreContentPage } from './morecontent-page.component';

describe('MoviesPageComponent', () => {
  let component: MoreContentPage;
  let fixture: ComponentFixture<MoreContentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreContentPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreContentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
