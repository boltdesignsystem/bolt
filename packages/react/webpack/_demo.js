import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import {
  Button,
  TextLink,
  IconBellSolid,
  IconInfoCircle,
  IconWarning,
  Select,
  ControlledNestedSelect,
  SwitchButton,
  Form,
  Fieldset,
  Label,
  Input,
  FormElement,
  Textarea,
  useForm,
  Pagination,
  getFirstFocusableElement,
} from '.';

const App = () => {
  // Form valiation
  const {
    register,
    formState: { errors, isValid },
  } = useForm({ mode: 'onTouched' });

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [pagerLoadCount, setPagerLoadCount] = useState(0);
  const itemsPerPage = 5;
  const paginationItems = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
  ];

  const PaginatedItems = ({ items, itemsPerPage, currentPage }) => {
    const offset = currentPage * itemsPerPage;
    const currentItems = items.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(items.length / itemsPerPage);
    const handlePageChange = ({ selected: selectedPage }) => {
      setCurrentPage(selectedPage);
      setPagerLoadCount(pagerLoadCount + 1);
    };

    useEffect(() => {
      if (pagerLoadCount > 0) {
        const firstFocusableElement = getFirstFocusableElement(
          document.querySelector('.js-base-paginated-content'),
        );
        firstFocusableElement?.focus();
      }
    }, [currentPage]);

    return (
      <>
        {currentItems && (
          <ul className="js-base-paginated-content">
            {currentItems &&
              currentItems.map(item => (
                <li>
                  Item {item} with{' '}
                  <TextLink size="xsmall" hierarchy="transparent">
                    focusable element
                  </TextLink>
                </li>
              ))}
          </ul>
        )}
        {items.length > itemsPerPage && (
          <div className="u-bolt-padding-top-medium u-bolt-padding-bottom-medium">
            <Pagination
              onPageChange={handlePageChange}
              pageCount={pageCount}
              initialPage={currentPage}
            />
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <h2>Buttons</h2>
      <bolt-stack>
        <Button>
          This is a <em>button</em>
        </Button>
      </bolt-stack>
      <bolt-stack>
        <Button hierarchy="secondary">Secondary button</Button>
      </bolt-stack>
      <bolt-stack>
        <Button size="small">Small button</Button>
      </bolt-stack>
      <bolt-stack>
        <Button display="block">Block button</Button>
      </bolt-stack>
      <bolt-stack>
        <Button borderRadius="full">Border-radius full button</Button>
      </bolt-stack>
      <bolt-stack>
        <Button iconOnly>
          <IconBellSolid />
        </Button>
      </bolt-stack>
      <bolt-stack>
        <Button href="http://pega.com" target="_blank">
          Button-style link
        </Button>
      </bolt-stack>
      <bolt-stack>
        <Button disabled foo="bar" className="some-other-class">
          Button with additional props
        </Button>
      </bolt-stack>
      <hr />
      <h2>Text Link</h2>
      <bolt-stack>
        <TextLink href="http://google.com" target="_blank">
          Text link to google.com
        </TextLink>
      </bolt-stack>
      <bolt-stack>
        <TextLink type="reset">
          Text link that is semantically a reset button
        </TextLink>
      </bolt-stack>
      <bolt-stack>
        <TextLink
          href="http://google.com"
          iconBefore={<IconBellSolid />}
          iconAfter={<IconBellSolid />}>
          Text link with icon before and after
        </TextLink>
      </bolt-stack>
      <bolt-stack>
        <TextLink href="http://google.com" reverseUnderline={true}>
          Text link with reverse-underline
        </TextLink>
      </bolt-stack>
      <bolt-stack>
        <div
          style={{
            border: '1px solid gray',
            backgroundColor: 'lightgray',
            position: 'relative',
            padding: '1rem',
          }}>
          <TextLink href="http://google.com" expandClickTarget={true}>
            Text link with expanded click target
          </TextLink>
        </div>
      </bolt-stack>
      <hr />
      <h2>Icons</h2>
      <bolt-stack>
        <IconBellSolid />
      </bolt-stack>
      <bolt-stack>
        <IconBellSolid size="medium" color="berry" />
      </bolt-stack>
      <h2>Switch Button</h2>
      <bolt-stack>
        <SwitchButton
          onClickHandler={e => {
            console.log('yo 1');
          }}
        />
      </bolt-stack>
      <bolt-stack>
        <SwitchButton
          on={true}
          className={'custom-class-1 custom-class-2'}
          htmlFor="custom-label-for-123"
          buttonAttributes={{ id: 'custom-label-for-123', 'data-foo': 'bar' }}
          onClickHandler={() => {
            console.log('yo 2');
          }}
        />
      </bolt-stack>
      <h2>Form</h2>
      <h3>Form element input field</h3>
      <Form>
        <Fieldset
          legendTitle="Fieldset legend"
          legendAttributes={{ className: 'u-bolt-visuallyhidden' }}>
          <FormElement
            label={
              <Label displayType="floating-label" htmlFor="input-text">
                Text input type
              </Label>
            }
            descriptionText={
              <>
                <IconInfoCircle />{' '}
                <small>Helper text for this specific form input.</small>
              </>
            }>
            <Input placeholder="Enter text" type="text" id="input-text" />
          </FormElement>
          <FormElement
            label={
              <Label displayType="floating-label" htmlFor="input-text-required">
                Text input type
              </Label>
            }>
            <Input
              placeholder="Enter text (required)"
              type="text"
              id="input-text-required"
              required
            />
          </FormElement>
          <FormElement
            label={
              <Label displayType="floating-label" htmlFor="input-text-disabled">
                Text input type
              </Label>
            }>
            <Input
              placeholder="Enter text (disabled)"
              type="text"
              id="input-text-disabled"
              disabled
            />
          </FormElement>
          <FormElement
            label={
              <Label displayType="floating-label" htmlFor="input-text-email">
                Email input type
              </Label>
            }>
            <Input
              placeholder="Enter email"
              type="email"
              id="input-text-email"
            />
          </FormElement>
          <FormElement
            label={
              <Label displayType="floating-label" htmlFor="input-text-password">
                Password input type
              </Label>
            }>
            <Input
              placeholder="Enter password"
              type="password"
              id="input-text-password"
            />
          </FormElement>
          <FormElement
            label={
              <Label displayType="floating-label" htmlFor="input-text-url">
                URL input type
              </Label>
            }>
            <Input placeholder="Enter URL" type="url" id="input-text-url" />
          </FormElement>
          <FormElement
            label={
              <Label displayType="floating-label" htmlFor="input-text-tel">
                Telephone input type
              </Label>
            }>
            <Input
              placeholder="Enter telephone number"
              type="tel"
              id="input-text-tel"
            />
          </FormElement>
        </Fieldset>
      </Form>
      <h3>Form label display</h3>
      <Form>
        <Fieldset
          legendTitle="Fieldset legend"
          legendAttributes={{ className: 'u-bolt-visuallyhidden' }}>
          <FormElement
            label={
              <Label
                displayType="floating-label"
                htmlFor="input-floating-label">
                Text input type
              </Label>
            }>
            <Input
              placeholder="Enter text"
              type="text"
              id="input-floating-label"
            />
          </FormElement>
          <FormElement
            label={
              <Label displayType="block" htmlFor="input-block-label">
                <strong>Block label</strong>
              </Label>
            }
            labelDisplay="before">
            <Input
              placeholder="Enter text (required)"
              type="text"
              id="input-block-label"
              required
            />
          </FormElement>
        </Fieldset>
      </Form>
      <h3>Form fieldset options</h3>
      <Form>
        <Fieldset
          legendTitle="Fieldset legend"
          legendAttributes={{ className: 'u-bolt-visuallyhidden' }}
          errors={
            <>
              <IconWarning /> This is an error message for this specific
              fieldset.
            </>
          }
          descriptionText={
            <>
              <IconInfoCircle />{' '}
              <small>Helper text for this specific form input.</small>
            </>
          }>
          <FormElement
            label={
              <Label displayType="floating-label" htmlFor="input-text-1">
                Text input type
              </Label>
            }>
            <Input placeholder="Enter text" type="text" id="input-text-1" />
          </FormElement>
        </Fieldset>
      </Form>
      <h3>Form Radios and Checkboxes</h3>
      <Form>
        <Fieldset legendTitle="Select an alignment" noSpace={true}>
          <FormElement
            label={
              <Label
                displayType="inline-radio"
                htmlFor="radio-left"
                name="radio-alignment">
                Left-aligned
              </Label>
            }>
            <Input type="radio" id="radio-left" />
          </FormElement>
          <FormElement
            label={
              <Label
                displayType="inline-radio"
                htmlFor="radio-center"
                name="radio-alignment">
                Center-aligned
              </Label>
            }>
            <Input type="radio" id="radio-center" />
          </FormElement>
          <FormElement
            label={
              <Label
                displayType="inline-radio"
                htmlFor="radio-right"
                name="radio-alignment">
                Right-aligned
              </Label>
            }>
            <Input type="checkbox" id="radio-right" />
          </FormElement>
        </Fieldset>
        <Fieldset legendTitle="Select toppings" noSpace={true}>
          <FormElement
            label={
              <Label
                displayType="inline-checkbox"
                htmlFor="checkbox-pepperoni"
                name="checkbox-toppings">
                Pepperoni
              </Label>
            }>
            <Input type="checkbox" id="checkbox-pepperoni" />
          </FormElement>
          <FormElement
            label={
              <Label
                displayType="inline-checkbox"
                htmlFor="checkbox-peppers"
                name="checkbox-toppings">
                Peppers
              </Label>
            }>
            <Input type="checkbox" id="checkbox-peppers" />
          </FormElement>
          <FormElement
            label={
              <Label
                displayType="inline-checkbox"
                htmlFor="radio-olives"
                name="checkbox-toppings">
                Olives
              </Label>
            }>
            <Input type="checkbox" id="radio-olives" />
          </FormElement>
        </Fieldset>
      </Form>
      <h3>Form Textarea</h3>
      <Form>
        <Fieldset legendTitle="Form textarea">
          <FormElement
            label={<Label displayType="floating">Describe the job</Label>}>
            <Textarea placeholder="Describe the job" />
          </FormElement>
        </Fieldset>
      </Form>
      <h2>Select</h2>
      <bolt-stack>
        <Form>
          <Fieldset
            legendTitle="Select demos"
            legendAttributes={{ className: 'u-bolt-visuallyhidden' }}>
            <FormElement
              label={
                <Label displayType="block" htmlFor="single-select">
                  <strong>Single select, clearable</strong>
                </Label>
              }
              labelDisplay="before">
              <Select
                name="field_moderator_tags_target_id"
                required={true}
                isClearable={true}
                delimiter="" // pass empty string to output separate <input> for each value
                options={[
                  { value: 33206, label: 'Pega Academy' },
                  { value: 33211, label: 'Event' },
                  {
                    value: 33216,
                    label: 'Support Case Created',
                    isIndented: true,
                  },
                  {
                    value: 33221,
                    label: 'Support Case Exists',
                    isIndented: true,
                  },
                  { value: 33226, label: 'Ask the Expert', isIndented: true },
                  { value: 33231, label: 'Support Case Parallel' },
                  { value: 33236, label: 'Support News', isIndented: true },
                  {
                    value: 33241,
                    label: 'Developer Knowledge Share',
                    isIndented: true,
                  },
                  { value: 33246, label: 'Patch Release' },
                  { value: 47701, label: 'Pega Platform Release' },
                  { value: 49406, label: 'Upgrade' },
                  { value: 57436, label: 'Hackathon', isIndented: true },
                  { value: 60751, label: 'Pega Knowledge Share' },
                ]}
                onChange={(selectedOption, inputAction) => {
                  console.log(`Select changed...`);
                  console.log('selectedOption:', selectedOption);
                  console.log('inputAction:', inputAction);
                }}
                id="single-select"
                // menuIsOpen={true}
              />
            </FormElement>
            <FormElement
              label={
                <Label displayType="block" htmlFor="multi-select">
                  <strong>Multi select with default values</strong>
                </Label>
              }
              labelDisplay="before">
              <Select
                name={'field_platform_capability_target_id'}
                defaultValue={[
                  { value: 6886, label: 'Reporting' },
                  { value: 6891, label: 'Robotic Process Automation' },
                ]}
                closeMenuOnSelect={false}
                isMulti={true}
                options={[
                  { value: 6886, label: 'Reporting' },
                  { value: 6891, label: 'Robotic Process Automation' },
                  { value: 6896, label: 'Security' },
                  { value: 6911, label: 'Workforce Intelligence' },
                  { value: 6916, label: 'Conversational Channels' },
                  { value: 6936, label: 'Decision Management' },
                  { value: 18271, label: 'Low-Code App Development' },
                  { value: 18276, label: 'Testing Applications' },
                  { value: 18281, label: 'App Factory' },
                  { value: 18286, label: 'Upgrades' },
                  { value: 18291, label: 'Installation and Deployment' },
                  { value: 18296, label: 'Performance' },
                  { value: 18301, label: 'Prediction Studio' },
                  { value: 18306, label: 'Admin Studio' },
                  { value: 18311, label: 'App Studio' },
                  { value: 18316, label: 'Dev/Designer Studio' },
                  { value: 18321, label: 'Data Integration' },
                  { value: 18326, label: 'Java and Activities' },
                  { value: 18331, label: 'System Administration' },
                  { value: 18336, label: 'User Experience' },
                  { value: 18341, label: 'Case Management' },
                  { value: 18346, label: 'Cloud Services' },
                  { value: 18351, label: 'DevOps' },
                  { value: 18356, label: 'Mobile' },
                  { value: 18361, label: 'Project Delivery' },
                  { value: 45371, label: 'Pega Cloud' },
                  { value: 45376, label: 'Client-managed Cloud' },
                  { value: 55191, label: 'Enterprise Application Development' },
                  { value: 61466, label: 'DX API' },
                  { value: 61471, label: 'Pega Express' },
                ]}
                onChange={(selectedOption, inputAction) => {
                  console.log(`Select changed...`);
                  console.log('selectedOption:', selectedOption);
                  console.log('inputAction:', inputAction);
                }}
                id="multi-select"
              />
            </FormElement>
            <FormElement
              label={
                <Label displayType="block" htmlFor="single-select-hierarchical">
                  <strong>Single select with hierachical options</strong>
                </Label>
              }
              labelDisplay="before">
              <ControlledNestedSelect
                id="single-select-hierarchical"
                options={[
                  { value: 1, label: 'Item 1' },
                  {
                    value: 2,
                    label: 'Item 2',
                    children: [
                      { value: 6, label: 'Item 2 > Child 1' },
                      { value: 7, label: 'Item 2 > Child 2' },
                      { value: 8, label: 'Item 2 > Child 3' },
                    ],
                  },
                  {
                    value: 3,
                    label: 'Item 3',
                    children: [{ value: 9, label: 'Item 3 > Child 1' }],
                  },
                  { value: 4, label: 'Item 4' },
                  { value: 5, label: 'Item 5' },
                ]}
                defaultValue={[{ value: 6, label: 'Item 2 > Child 1' }]}
                isClearable={true}
                // menuIsOpen={true}
                closeMenuOnSelect={false}
              />
            </FormElement>
            <FormElement
              label={
                <Label displayType="block" htmlFor="multi-select-hierarchical">
                  <strong>Multi select with hierachical options</strong>
                </Label>
              }
              labelDisplay="before">
              <ControlledNestedSelect
                id="multi-select-hierarchical"
                isMulti={true}
                options={[
                  { value: 1, label: 'Item 1' },
                  {
                    value: 2,
                    label: 'Item 2',
                    children: [
                      { value: 6, label: 'Item 2 > Child 1' },
                      { value: 7, label: 'Item 2 > Child 2' },
                      { value: 8, label: 'Item 2 > Child 3' },
                    ],
                  },
                  {
                    value: 3,
                    label: 'Item 3',
                    children: [{ value: 9, label: 'Item 3 > Child 1' }],
                  },
                  { value: 4, label: 'Item 4' },
                  { value: 5, label: 'Item 5' },
                ]}
                defaultValue={[
                  { value: 1, label: 'Item 1' },
                  { value: 6, label: 'Item 2 > Child 1' },
                  // { value: 3, label: 'Item 3' },
                  { value: 9, label: 'Item 3 > Child 1' },
                ]}
                // menuIsOpen={true}
                closeMenuOnSelect={false}
              />
            </FormElement>
            {/* Include submit button to verify native validation works */}
            <bolt-stack>
              <Button type="submit" size="small">
                Submit form
              </Button>
            </bolt-stack>
          </Fieldset>
        </Form>
      </bolt-stack>
      <h3>Form Validation</h3>
      <Form>
        <Fieldset
          legendTitle="Fieldset legend"
          legendAttributes={{ className: 'u-bolt-visuallyhidden' }}>
          <FormElement
            label={
              <Label
                displayType="floating-label"
                htmlFor="input-text-validate-1">
                Text input type
              </Label>
            }
            errors={errors.inputTextValidate1?.message}>
            <Input
              placeholder="Enter text (required)"
              type="text"
              id="input-text-validate-1"
              hasErrors={errors.inputTextValidate1}
              {...register('inputTextValidate1', {
                required: 'This field is required (custom message)',
              })}
            />
          </FormElement>
          <FormElement
            label={
              <Label
                displayType="floating-label"
                htmlFor="input-text-validate-2">
                Text input type
              </Label>
            }
            errors={errors.inputTextValidate2?.message}>
            <Input
              placeholder="Enter text (required)"
              type="text"
              id="input-text-validate-2"
              hasErrors={errors.inputTextValidate2}
              {...register('inputTextValidate2', {
                required: true,
                minLength: {
                  value: 4,
                  message: 'Must be at least 4 characters long',
                },
              })}
            />
          </FormElement>
        </Fieldset>
        <Button type="submit" disabled={!isValid}>
          Submit
        </Button>
      </Form>
      <h2>Pagination</h2>
      <PaginatedItems
        items={paginationItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
      />{' '}
    </>
  );
};

const selector = '#ui-components';
const target = document.querySelector(selector);

if (target) {
  const root = createRoot(target);
  root.render(<App />, target);
} else {
  console.log(`Selector '${selector}' not found`);
}
