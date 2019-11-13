
Import("ArrayUtils.js");
Import("NodeListUtils.js");

function Import(file) {
    //source:http://www.forosdelweb.com/f13/importar-archivo-js-dentro-javascript-387358/
    document.write('<script language=\"JavaScript\" type=\"text/JavaScript\" src=' + file + '></script>');
}

class SelectUtils {
    static SelectedIndex(select) {
        return select.selectedIndex;
    }
    static GetAt(select, position) {
        return select.options[position];
    }
    static GetSelectedItem(select) {
        return SelectUtils.GetAt(select, SelectUtils.SelectedIndex(select));
    }
    static Count(select) {
        return select.options.length;
    }
    static RemoveAt(select, position) {
        NodeListUtils.RemoveAt(select.options, position);
    }
    static Add(select, value, innerText) {
        var option = SelectUtils.GetOption(value, innerText);
        select.options.add(option);
        return option;
    }
    static Push(select, value, innerText) {
        var option = SelectUtils.GetOption(value, innerText);
        NodeListUtils.Push(select.options, option);
        return option;
    }
    static GetOption(value, innerText) {
        var option = document.createElement("option");
        option.setAttribute("value", value);
        option.innerText = innerText;
        return option;
    }

    static FindPositions(select, value) {
        var posiciones = [];
        for (var i = 0, f = SelectUtils.Count(select); i < f; i++)
            if (SelectUtils.GetAt(select, i).value == value)
                ArrayUtils.Add(posiciones, i);
        return posiciones;
    }
    static Remove(select, value) {
        var posiciones = SelectUtils.FindPositions(select, value);

        for (var i = 0; i < posiciones.length; i++)
            SelectUtils.RemoveAt(select, posiciones[i]);
    }

}