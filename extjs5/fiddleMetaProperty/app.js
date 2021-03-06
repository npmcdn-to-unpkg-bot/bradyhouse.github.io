Ext.onReady(function () {

    Ext.define('App.Model', {
        extend: 'Ext.data.TreeModel',
        entityName: 'Person',
        idProperty: 'text',
        fields: [{
            name: "text",
            convert: undefined
        }, {
            name: "checked",
            defaultValue: false
        }, {
            name: "expanded",
            defaultValue: true
        }, {
            name: "status"
        }]
    });

    Ext.define('App.Store', {
        extend: 'Ext.data.TreeStore',
        model: 'App.Model',
        requires: ['App.Model'],
        listeners: {
            metachange: function (store, meta) {
                Ext.Msg.alert('metachange', "Version " + meta.version + "<br />Search query " + meta.searchquery);
            }
        },
        proxy: {
            type: 'ajax',
            url: 'data.json',
            reader: {
                type: 'json',
                // <debug>
                // Including this configuration in
                // 5.0.1.* prevents the tree panel
                // from binding to the treestore.
                metaProperty: 'myMetaData'
                // </debug>
            }
        }

    });

    Ext.define('App.TreePanel', {
        extend: 'Ext.tree.Panel',
        alias: 'widget.usercorps',
        title: 'TreeStore - MetaProperty',
        rootVisible: false,
        scroll: 'both',
        columns: [{
            xtype: 'treecolumn',
            text: 'Tree Column',
            flex: 1.5,
            sortable: true,
            dataIndex: 'text'
        }, {
            dataIndex: 'status',
            flex: 1
        }],
        single: true,
        initComponent: function () {
            this.title += '&nbsp;&nbsp;(ExtJS Version ' + Ext.getVersion().getMajor() + '.' + Ext.getVersion().getMinor() + '.' + Ext.getVersion().getPatch() + '.' + Ext.getVersion().getBuild() + ')</span>';
            this.callParent();

        }
    });

    try {
        Ext.create('App.Store', {
            storeId: 'myStore'
        });

        var myStore = Ext.getStore('myStore');
        myStore.load();
        Ext.create('App.TreePanel', {
            store: myStore,
            renderTo: Ext.getBody()
        });

    } catch (err) {
        Ext.Msg.alert('Error', err.message);
    }




});