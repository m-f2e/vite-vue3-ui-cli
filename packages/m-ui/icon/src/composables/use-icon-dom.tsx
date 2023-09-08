import { SetupContext, computed, toRefs, resolveDynamicComponent } from "vue";
import { IconProps, UseIconDom } from "../icon-types";
import { useNamespace } from "../../../shared/hooks/use-namespace";
import svgIcon from '../svg-icon';
import { isUrl } from '../../../shared/utils/url';

export function useIconDom(props: IconProps, ctx: SetupContext): UseIconDom {
  const { component, name, size, color, classPrefix, rotate } = toRefs(props);
  const ns = useNamespace('icon');

  const iconSize = computed(() => {
    return typeof size.value === 'number' ? `${size.value}px` : `${size.value}`;
  });

  const isInfinite = computed(() => {
    return typeof rotate?.value === 'string' ? rotate?.value === 'infinite' : false;
  })

  const IconComponent = component.value ? resolveDynamicComponent(component.value) : resolveDynamicComponent(svgIcon);

  const imgIconDom = () => {
    return (
      <img
        src={name.value}
        alt={name.value.split('/')[name.value.split('/').length - 1]}
        class={[isInfinite && ns.m('spin')]}
        style={{ width: iconSize.value, transform: `rotate(${rotate?.value}deg)`, verticalAlign: 'middle' }}
        {...ctx.attrs}
      />
    );
  };

  const svgIconDom = () => {
    return (
      <IconComponent
        name={name.value}
        color={color.value}
        size={iconSize.value}
        class={[isInfinite && ns.m('spin')]}
        style={{ transform: `rotate(${rotate?.value}deg)` }}
        {...ctx.attrs}></IconComponent>
    );
  };

  const fontIconDom = () => {
    const fontIconClass = /^icon-/.test(name.value) ? name.value : `${classPrefix.value}-${name.value}`;
    return (
      <i
        class={[classPrefix.value, fontIconClass, isInfinite && ns.m('spin')]}
        style={{ fontSize: iconSize.value, color: color.value, transform: `rotate(${rotate?.value}deg)` }}
        {...ctx.attrs}></i>
    );
  };

  const iconDom = () => {
    return component.value ? svgIconDom() : isUrl(name.value) ? imgIconDom() : fontIconDom();
  };

  return { iconDom };
}