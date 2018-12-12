import { h } from 'preact';

import { Tooltip } from '../pl-tooltip/pl-tooltip';
import VisuallyHidden from '@reach/visually-hidden';

import PhoneIcon from '../../../icons/phone.svg';
import TabletIcon from '../../../icons/tablet.svg';
import LaptopIcon from '../../../icons/laptop.svg';
import DesktopIcon from '../../../icons/desktop.svg';
import DiscoIcon from '../../../icons/disco-ball.svg';
import RandomIcon from '../../../icons/random.svg';

export const ViewportSizeList = ishControlsHide => {
  return (
    <ul class="pl-c-size-list">
      {!ishControlsHide.s && (
        <li class="pl-c-size-list__item">
          <Tooltip
            placement="top"
            trigger="hover"
            tooltip="Small"
            usePortal={false}
          >
            {({ getTriggerProps, triggerRef }) => (
              <button
                {...getTriggerProps({
                  className: 'pl-c-size-list__action',
                  id: 'pl-size-s',
                  ref: triggerRef,
                })}
              >
                <VisuallyHidden>Resize viewport to small</VisuallyHidden>
                <PhoneIcon
                  width={14}
                  height={20}
                  fill="currentColor"
                  viewBox="0 0 24 12"
                />
              </button>
            )}
          </Tooltip>
        </li>
      )}
      {!ishControlsHide.m && (
        <li class="pl-c-size-list__item">
          <Tooltip
            placement="top"
            trigger="hover"
            tooltip="Medium"
            usePortal={false}
          >
            {({ getTriggerProps, triggerRef }) => (
              <button
                {...getTriggerProps({
                  className: 'pl-c-size-list__action',
                  id: 'pl-size-m',
                  ref: triggerRef,
                })}
              >
                <VisuallyHidden>Resize viewport to medium</VisuallyHidden>
                <TabletIcon
                  width={16}
                  height={24}
                  fill="currentColor"
                  viewBox="0 0 24 16"
                />
              </button>
            )}
          </Tooltip>
        </li>
      )}
      {!ishControlsHide.l && (
        <li class="pl-c-size-list__item">
          <Tooltip
            placement="top"
            trigger="hover"
            tooltip="Large"
            usePortal={false}
          >
            {({ getTriggerProps, triggerRef }) => (
              <button
                {...getTriggerProps({
                  className: 'pl-c-size-list__action',
                  id: 'pl-size-l',
                  ref: triggerRef,
                })}
              >
                <VisuallyHidden>Resize viewport to large</VisuallyHidden>
                <LaptopIcon
                  width={24}
                  height={22}
                  fill="currentColor"
                  viewBox="0 0 24 20"
                />
              </button>
            )}
          </Tooltip>
        </li>
      )}
      {!ishControlsHide.full && (
        <li class="pl-c-size-list__item">
          <Tooltip
            placement="top"
            trigger="hover"
            tooltip="Full"
            usePortal={false}
          >
            {({ getTriggerProps, triggerRef }) => (
              <button
                {...getTriggerProps({
                  className: 'pl-c-size-list__action',
                  id: 'pl-size-full',
                  ref: triggerRef,
                })}
              >
                <VisuallyHidden>Resize viewport to full</VisuallyHidden>
                <DesktopIcon
                  width={24}
                  height={22}
                  fill="currentColor"
                  viewBox="0 0 24 20"
                />
              </button>
            )}
          </Tooltip>
        </li>
      )}
      {!ishControlsHide.random && (
        <li class="pl-c-size-list__item">
          {/* <button class="pl-c-size-list__action" id="pl-size-random">
            Rand
          </button> */}

          <Tooltip
            placement="top"
            trigger="hover"
            tooltip="Random"
            usePortal={false}
          >
            {({ getTriggerProps, triggerRef }) => (
              <button
                {...getTriggerProps({
                  className: 'pl-c-size-list__action',
                  id: 'pl-size-random',
                  ref: triggerRef,
                })}
              >
                <VisuallyHidden>Resize viewport to random</VisuallyHidden>
                <RandomIcon
                  width={24}
                  height={24}
                  fill="currentColor"
                  stroke="currentColor"
                  viewBox="0 0 28 28"
                />
              </button>
            )}
          </Tooltip>
        </li>
      )}
      {!ishControlsHide.disco && (
        <li class="pl-c-size-list__item">
          <Tooltip
            placement="top"
            trigger="hover"
            tooltip="Disco"
            usePortal={false}
          >
            {({ getTriggerProps, triggerRef }) => (
              <button
                {...getTriggerProps({
                  className: 'pl-c-size-list__action',
                  id: 'pl-size-disco',
                  ref: triggerRef,
                })}
              >
                <VisuallyHidden>
                  Resize viewport using disco mode!
                </VisuallyHidden>
                <DiscoIcon
                  width={24}
                  height={24}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                />
              </button>
            )}
          </Tooltip>
        </li>
      )}
      {!ishControlsHide.hay && (
        <li class="pl-c-size-list__item">
          <button class="pl-c-size-list__action mode-link" id="pl-size-hay">
            Hay!
          </button>
        </li>
      )}
    </ul>
  );
};
