if (Meteor.isClient) {
    Template.index.helpers({
        isResultSet: function() {
            var data = Session.get('result');
            return (data) ? true : false;
        }
    });

    Template.Results.helpers({
        Results: function() {
            var data = Session.get('result');
            var array = $.map(data.results, function(value, index) {
                return [value];
            });

            return (array) ? array : false;
        },
        ReturnImage : function() {
            var data = Session.get('result');
            return data.image;
        },
        RawResults : function () {
            var data = Session.get('result');
            return JSON.stringify(data);
        },
        GetColour : function(confidence) {

            function Interpolate(start, end, steps, count) {
                var s = start,
                    e = end,
                    final = s + (((e - s) / steps) * count);
                return Math.floor(final);
            }

            function Color(_r, _g, _b) {
                var r, g, b;
                var setColors = function(_r, _g, _b) {
                    r = _r;
                    g = _g;
                    b = _b;
                };

                setColors(_r, _g, _b);
                this.getColors = function() {
                    var colors = {
                        r: r,
                        g: g,
                        b: b
                    };
                    return colors;
                };
            }

            var self = this,
                span = $(self).parent("span"),
                confidence = confidence * 100,
                red = new Color(251, 91, 91),
                white = new Color(255, 255, 255), //rgb(253, 243, 7)
                green = new Color(108,209,45),
                start = green,
                end = red;


            if (confidence > 50) {
                start = white,
                    end = green;
                confidence = confidence % 51;
            }

            var startColors = start.getColors(),
                endColors   = end.getColors();
            var r = Interpolate(startColors.r, endColors.r, 50, confidence);
            var g = Interpolate(startColors.g, endColors.g, 50, confidence);
            var b = Interpolate(startColors.b, endColors.b, 50, confidence);

            return "rgb(" + r + "," + g + "," + b + ")";

        }
    });

}
