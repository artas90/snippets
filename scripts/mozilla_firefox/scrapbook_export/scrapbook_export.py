#coding: utf-8

import os
import xmltodict
p = os.path


#------------------------

scrapbook_dir   = '/path/to/scrapbook'
out_dir         = '/path/to/put/results'
webarchiver_bin = '/usr/local/bin/webarchiver'

data_dir   = p.join(scrapbook_dir, 'data')
data_index = p.join(scrapbook_dir, 'scrapbook.rdf')

#------------------------

data = open(data_index).read()
data = xmltodict.parse(data)

all_items = [
    (
        item['@NS1:id'].encode('utf-8'),
        item['@NS1:title'].encode('utf-8'), 
        item['@NS1:type'].encode('utf-8'),
    )
    for item in data['RDF:RDF']['RDF:Description']
]

folders     = [(it[0], it[1]) for it in all_items if it[2] == 'folder']
non_folders = [it             for it in all_items if it[2] != 'folder']

# ----

folder_mappings = [
    (
        item['@RDF:about'].encode('utf-8'),

        [ li['@RDF:resource'] for li in item['RDF:li'] if type(li).__name__ == 'OrderedDict' ],
    )
    for item in data['RDF:RDF']['RDF:Seq']
]

# ----

item_to_folder = {}
folders_dict =  dict([ ('urn:scrapbook:item'+f_id, f_name) for f_id, f_name in folders ])


for folder_id, item_ids in folder_mappings:
    for item_id in item_ids:
        item_to_folder[item_id] = folders_dict.get(folder_id, '')

# ---- Create dirs

for id_, title in folders:
    directory = p.join(out_dir, title)
    if not os.path.exists(directory):
        os.makedirs(directory)

# ---- Convert data itself

for id_, title, type_ in non_folders:

    title = title.replace('/', '')
    dir_ = item_to_folder.get('urn:scrapbook:item'+id_, '')

    page = p.join(data_dir, id_, 'index.html')
    output = p.join(out_dir, dir_, title+'.webarchive')
    cmd = '{} -url {} -output "{}"'.format(webarchiver_bin, page, output)

    print cmd

    os.system(cmd)

