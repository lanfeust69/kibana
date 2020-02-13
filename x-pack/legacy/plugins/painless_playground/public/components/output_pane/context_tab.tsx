/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';
import {
  EuiFieldText,
  EuiFormRow,
  EuiPanel,
  EuiSpacer,
  EuiIcon,
  EuiToolTip,
  EuiLink,
  EuiText,
  EuiSuperSelect,
} from '@elastic/eui';
import { FormattedMessage } from '@kbn/i18n/react';
import { i18n } from '@kbn/i18n';

import { CodeEditor } from '../../../../../../../src/plugins/kibana_react/public';
import { painlessContextOptions } from '../../common/constants';

interface Props {
  context: string;
  contextSetup: Record<string, string>;
  setContext: (context: string) => void;
  setContextSetup: (contextSetup: Record<string, string>) => void;
  renderMainControls: () => React.ReactElement;
}

export function ContextTab({ context, contextSetup, setContext, setContextSetup }: Props) {
  return (
    <>
      <EuiSpacer size="m" />
      <EuiFormRow
        label={
          <EuiToolTip
            content={i18n.translate('xpack.painless_playground.contextFieldTooltipText', {
              defaultMessage: 'Different contexts provide different functions on the ctx object',
            })}
          >
            <span>
              <FormattedMessage
                id="xpack.painless_playground.contextFieldLabel"
                defaultMessage="Execution context"
              />{' '}
              <EuiIcon type="questionInCircle" color="subdued" />
            </span>
          </EuiToolTip>
        }
        labelAppend={
          <EuiText size="xs">
            <EuiLink
              href="https://www.elastic.co/guide/en/elasticsearch/painless/current/painless-execute-api.html"
              target="_blank"
            >
              {i18n.translate('xpack.painless_playground.contextFieldDocLinkText', {
                defaultMessage: 'Context docs',
              })}
            </EuiLink>
          </EuiText>
        }
        fullWidth
      >
        <EuiSuperSelect
          options={painlessContextOptions}
          valueOfSelected={context}
          onChange={(value: any) => setContext(value)}
          itemLayoutAlign="top"
          hasDividers
          fullWidth
        />
      </EuiFormRow>

      {['filter', 'score'].indexOf(context) !== -1 && (
        <EuiFormRow
          label={
            <EuiToolTip
              content={i18n.translate('xpack.painless_playground.indexFieldTooltipText', {
                defaultMessage:
                  "Index mappings must be compatible with the sample document's fields",
              })}
            >
              <span>
                <FormattedMessage
                  id="xpack.painless_playground.indexFieldLabel"
                  defaultMessage="Index"
                />{' '}
                <EuiIcon type="questionInCircle" color="subdued" />
              </span>
            </EuiToolTip>
          }
          fullWidth
        >
          <EuiFieldText
            fullWidth
            value={contextSetup.index || ''}
            onChange={e =>
              setContextSetup(Object.assign({}, contextSetup, { index: e.target.value }))
            }
          />
        </EuiFormRow>
      )}
      {['filter', 'score'].indexOf(context) !== -1 && (
        <EuiFormRow
          label={
            <EuiToolTip
              content={i18n.translate('xpack.painless_playground.documentFieldTooltipText', {
                defaultMessage: "Your script can access this document's fields",
              })}
            >
              <span>
                <FormattedMessage
                  id="xpack.painless_playground.documentFieldLabel"
                  defaultMessage="Sample document"
                />{' '}
                <EuiIcon type="questionInCircle" color="subdued" />
              </span>
            </EuiToolTip>
          }
          fullWidth
        >
          <EuiPanel paddingSize="s">
            <CodeEditor
              languageId="javascript"
              height={400}
              value={contextSetup.document}
              onChange={(value: string) =>
                setContextSetup(Object.assign({}, contextSetup, { document: value }))
              }
              options={{
                fontSize: 12,
                minimap: {
                  enabled: false,
                },
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                wrappingIndent: 'indent',
                automaticLayout: true,
              }}
            />
          </EuiPanel>
        </EuiFormRow>
      )}
    </>
  );
}
