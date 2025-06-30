import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedPlaylistPage } from './shared-playlist-page';

describe('SharedPlaylistPage', () => {
  let component: SharedPlaylistPage;
  let fixture: ComponentFixture<SharedPlaylistPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedPlaylistPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedPlaylistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
