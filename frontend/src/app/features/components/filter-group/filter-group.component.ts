import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { FilterGroupConfig } from '../../models/image-filters.model';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../filter/filter.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter-group',
  imports: [
    CommonModule,
    FilterComponent,
    MatExpansionModule,
    MatIconModule,
    TranslateModule
  ],
  templateUrl: './filter-group.component.html',
  styleUrl: './filter-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterGroupComponent {
  @Input() group!: FilterGroupConfig;
  @Input() form!: FormGroup;
}
