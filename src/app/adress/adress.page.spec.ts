import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdressPage } from './adress.page';

describe('AdressPage', () => {
  let component: AdressPage;
  let fixture: ComponentFixture<AdressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdressPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
