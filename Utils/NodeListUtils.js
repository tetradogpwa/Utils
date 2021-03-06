window.Import(window._ROOTUTILS + "Utils/ArrayUtils.js");


class NodeListUtils {

    static Count(list) {
        return list.length;
    }
    static GetAt(list, position) {
        return list.item(position);
    }
    static RemoveAt(list, position) {
        list.removeChild(NodeListUtils.GetAt(list, position));
    }
    static IndexOf(list, node) {
        return ArrayUtils.IndexOf(Array.from(list), node);
    }
    static Push(list, node) {
        list.appendChild(node);
    }
    static GetNodes(list) {
        return list.entries();
    }
    static Remove(list, node) {
        NodeListUtils.RemoveAt(list, NodeListUtils.IndexOf(list, node));
    }

    static Add(list, node) {
        if (NodeListUtils.Count(list) > 0)
            NodeListUtils.InsertAt(list, NodeListUtils.Count(list) - 1, node);
        else NodeListUtils.Push(list, node);
    }
    static AddRange(list, nodeArray) {
        for (var i = 0; i < nodeArray.length; i++)
            NodeListUtils.Add(list, nodeArray[i]);
    }
    static Clear(list) {
        while (list.lastChild) {
            list.removeChild(list.lastChild);
        }
    }
    static InsertAt(list, index, node) {
        var array = Array.from(list);
        ArrayUtils.InsertAt(array, index, node);
        NodeListUtils.Clear(list);
        NodeListUtils.AddRange(list, array);
    }



}