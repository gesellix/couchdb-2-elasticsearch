# An Elasticsearch CouchDB River replacement

Elasticsearch rivers have been [deprecated](https://www.elastic.co/blog/deprecating-rivers),
which makes one think about alternatives. The recommended method is using [Logstash input plugins](https://github.com/logstash-plugins/logstash-input-couchdb_changes),
but that feels a bit too heavy for my needs.

There's a node.js based solution which allows to perform one-off imports from CouchDB and
continuous sync as well. The little tool is available as [couch2elastic4sync](https://github.com/ryanramage/couch2elastic4sync)
and in its minimal usage only needs the source database url and the target index.

If that's enough for your needs, just head over to it. If you want to run it in a Docker container,
feel free to use this repo, or directly run the image `gesellix/river`. A mapper has been added
to make the load and sync actions ignore CouchDB design documents. See below for other options.

## Usage

### Sync a database from the last checkpoint (or from _now_), then stop:

    docker run -e couch2elastic4sync_database=http://couchdb:5984/db-name -e couch2elastic4sync_elasticsearch=http://elastic:9200/index/type gesellix/river 

### Continuously sync a database from the last checkpoint (or from _now_):

    docker run -e couch2elastic4sync_database=http://couchdb:5984/db-name -e couch2elastic4sync_elasticsearch=http://elastic:9200/index/type -e couch2elastic4sync_end_on_catchup=false gesellix/river 

### Index a complete database, without continuous sync:

    docker run -e couch2elastic4sync_database=http://couchdb:5984/db-name -e couch2elastic4sync_elasticsearch=http://elastic:9200/index/type gesellix/river load 

**Caution**: the last example also indexes the design documents. To make them being ignored, just add the provided
 mapper like this:

     docker run -e couch2elastic4sync_database=http://couchdb:5984/db-name -e couch2elastic4sync_elasticsearch=http://elastic:9200/index/type -e couch2elastic4sync_mapper=drop_design_docs gesellix/river load
