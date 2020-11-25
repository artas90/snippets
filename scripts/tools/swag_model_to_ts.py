import sys

beforeDelim = lambda str, delim: ''.join(str.split(delim)[:1])

afterDelim = lambda str, delim: ''.join(str.split(delim)[1:])

def convert(data):
  dtos = [d.strip() for d in data.split('\n\n') if d.strip()]

  for dto in dtos:
    name = beforeDelim(dto, '{' )
    fields = afterDelim(dto, '{' ).strip().strip('}').split('\n')

    sys.stdout.write('\nexport interface I' + name + '{\n')

    for field in fields:
      meta = afterDelim(field, '=').strip().strip(',')
      field = beforeDelim(field, '=').strip().strip(',')
      stringEnum = afterDelim(meta, 'stringEnum').strip(':').replace(', ', ' | ')

      sys.stdout.write(' ' * 2)

      if stringEnum:
        field = field.replace(' (string, optional)', '').replace(' (integer, optional)', '')
        sys.stdout.write(field + ': ' + stringEnum)

      elif 'Array' in field:
        meta = afterDelim(field, ' ')
        field = beforeDelim(field, ' ')
        ref = afterDelim(meta, '[')
        ref = beforeDelim(ref, ']')

        sys.stdout.write(field + ': I' + ref + '[]')
      else:
        field = field.replace(' (string, optional)', ': string').replace(' (integer, optional)', ': number')
        sys.stdout.write(field)

      if field:
        sys.stdout.write(';')
      sys.stdout.write('\n')

    sys.stdout.write('}\n')

DATA = '''
AgreementAttachmentDto {
  id (integer, optional),
  name (string, optional),
  size (integer, optional)
}


AgreementRecipientDto {
  id (integer, optional),
  email (string, optional),
  type (string, optional) = ['USER', 'EMAIL']stringEnum:"USER", "EMAIL"
}


AgreementDto {
  id (integer, optional),
  name (string, optional),
  message (string, optional),
  status (string, optional) = ['DRAFT', 'IN_PROGRESS', 'SIGNED', 'CANCELLED']stringEnum:"DRAFT", "IN_PROGRESS", "SIGNED", "CANCELLED",
  recipients (Array[AgreementRecipientDto], optional),
  attachments (Array[AgreementAttachmentDto], optional)
}
'''

convert(DATA)
