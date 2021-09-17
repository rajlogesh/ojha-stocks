import { DurationPipePipe } from './duration-pipe.pipe';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DurationPipePipe', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ DurationPipePipe ]
    })
    .compileComponents();
  }));
  it('create an instance', () => {
    const pipe = new DurationPipePipe();
    expect(pipe).toBeTruthy();
  });
});
