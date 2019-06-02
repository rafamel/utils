import { TItems, IOutput } from './types';
import trunk from './trunk';

export default function generate(elements: TItems, custom?: TItems): IOutput {
  let response = trunk(elements || {}, true);

  if (custom) {
    const out = trunk(custom, false);
    response.css = (response.css + '\n' + out.css).trim();
    Object.assign(response.styles, out.styles);
  }

  return response;
}
