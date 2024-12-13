import { TestBed, async } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { MainComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TodoDataService } from '../todo-data.service';
import { ApiService } from '../api.service';
import { ApiMockService } from '../api-mock.service';

describe('MainComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        MainComponent
      ],
      providers: [
        TodoDataService,
        {
          provide: ApiService,
          useClass: ApiMockService
        }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(MainComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
