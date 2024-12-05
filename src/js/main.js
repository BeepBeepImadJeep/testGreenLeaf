import { BaseHelpers } from './helpers/base-helpers';
import { BurgerMenu } from './modules/burger-menu';
import { FilterNews } from './modules/filter-news';

BaseHelpers.checkWebpSupport();

BaseHelpers.calcScrollbarWidth();

BaseHelpers.addTouchClass();

BaseHelpers.addLoadedClass();

BurgerMenu.init();

FilterNews.init();

