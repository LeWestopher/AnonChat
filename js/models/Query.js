/**
 * Created by Westopher on 8/13/2015.
 */

var Query = {
    options: {
        select: [],
        where: [],
        orWhere: [],
        contain: [],
        leftJoin: [],
        innerJoin: [],
        rightJoin: []
    },

    select: function (columns) {
        this.options.select = columns;
        return this;
    },

    where: function (constraints) {
        this.options.where = constraints;
        return this;
    },

    orWhere: function (constraints) {
        this.options.orWhere = constraints;
        return this;
    },

    contain: function (associations) {
        this.options.contain = associations;
        return this
    },

    leftJoin: function (association) {
        this.options.leftJoin = association;
        return this;
    },

    innerJoin: function (association) {
        this.options.innerJoin = association;
        return this;
    },

    rightJoin: function (association) {
        this.options.rightJoin = association;
        return this;
    }
}